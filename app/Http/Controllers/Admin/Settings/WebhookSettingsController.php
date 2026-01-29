<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\CMS\WebhookLog;
use App\Models\Settings\WebhookSettings;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class WebhookSettingsController extends Controller
{
    /**
     * Display the webhook settings page.
     */
    public function index(): Response
    {
        $settings = app(WebhookSettings::class);

        return Inertia::render('admin/settings/Webhooks', [
            'settings' => [
                'endpoints' => $settings->endpoints,
                'enabled' => $settings->enabled,
                'retry_attempts' => $settings->retry_attempts,
                'timeout_seconds' => $settings->timeout_seconds,
            ],
            'availableEvents' => WebhookSettings::availableEvents(),
            'recentLogs' => WebhookLog::recent(7)
                ->orderBy('created_at', 'desc')
                ->limit(50)
                ->get(),
            'stats' => [
                'success_rate' => WebhookLog::getSuccessRate(7),
                'total_sent' => WebhookLog::recent(7)->count(),
                'failed' => WebhookLog::recent(7)->withStatus(WebhookLog::STATUS_FAILED)->count(),
            ],
        ]);
    }

    /**
     * Update webhook settings.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'enabled' => 'boolean',
            'retry_attempts' => 'integer|min:0|max:10',
            'timeout_seconds' => 'integer|min:5|max:120',
            'endpoints' => 'array',
            'endpoints.*.name' => 'required|string|max:120',
            'endpoints.*.url' => 'required|url|max:500',
            'endpoints.*.secret' => 'nullable|string|max:255',
            'endpoints.*.events' => 'required|array|min:1',
            'endpoints.*.events.*' => 'string|in:' . implode(',', array_keys(WebhookSettings::availableEvents())),
            'endpoints.*.is_active' => 'boolean',
        ]);

        $settings = app(WebhookSettings::class);

        if (isset($validated['enabled'])) {
            $settings->enabled = $validated['enabled'];
        }

        if (isset($validated['retry_attempts'])) {
            $settings->retry_attempts = $validated['retry_attempts'];
        }

        if (isset($validated['timeout_seconds'])) {
            $settings->timeout_seconds = $validated['timeout_seconds'];
        }

        if (isset($validated['endpoints'])) {
            // Ensure each endpoint has an ID
            $endpoints = array_map(function ($endpoint) {
                if (empty($endpoint['id'])) {
                    $endpoint['id'] = Str::uuid()->toString();
                }
                return $endpoint;
            }, $validated['endpoints']);

            $settings->endpoints = $endpoints;
        }

        $settings->save();

        return response()->json([
            'success' => true,
            'message' => 'Webhook settings updated successfully.',
        ]);
    }

    /**
     * Test a webhook endpoint.
     */
    public function test(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'url' => 'required|url|max:500',
            'secret' => 'nullable|string|max:255',
        ]);

        $settings = app(WebhookSettings::class);

        $testPayload = [
            'event' => 'test.ping',
            'timestamp' => now()->toIso8601String(),
            'data' => [
                'message' => 'This is a test webhook from SIGI CMS.',
                'tenant' => tenant()?->id,
            ],
        ];

        try {
            $signature = $validated['secret']
                ? hash_hmac('sha256', json_encode($testPayload), $validated['secret'])
                : null;

            $request = \Illuminate\Support\Facades\Http::timeout($settings->timeout_seconds)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'X-Webhook-Event' => 'test.ping',
                    'X-Webhook-Timestamp' => now()->toIso8601String(),
                ]);

            if ($signature) {
                $request->withHeaders([
                    'X-Webhook-Signature' => $signature,
                ]);
            }

            $response = $request->post($validated['url'], $testPayload);

            return response()->json([
                'success' => $response->successful(),
                'status_code' => $response->status(),
                'response' => substr($response->body(), 0, 1000),
                'message' => $response->successful()
                    ? 'Webhook test successful!'
                    : 'Webhook test failed with status ' . $response->status(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Webhook test failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Get webhook delivery logs.
     */
    public function logs(Request $request): JsonResponse
    {
        $query = WebhookLog::query()
            ->orderBy('created_at', 'desc');

        if ($request->has('event')) {
            $query->forEvent($request->input('event'));
        }

        if ($request->has('status')) {
            $query->withStatus($request->input('status'));
        }

        if ($request->has('days')) {
            $query->recent((int) $request->input('days'));
        } else {
            $query->recent(7);
        }

        $logs = $query->paginate(50);

        return response()->json($logs);
    }

    /**
     * Clear old webhook logs.
     */
    public function clearLogs(Request $request): JsonResponse
    {
        $days = $request->input('older_than_days', 30);

        $deleted = WebhookLog::where('created_at', '<', now()->subDays($days))->delete();

        return response()->json([
            'success' => true,
            'deleted' => $deleted,
            'message' => "Deleted {$deleted} log entries older than {$days} days.",
        ]);
    }
}
