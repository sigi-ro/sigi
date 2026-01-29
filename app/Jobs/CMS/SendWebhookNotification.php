<?php

namespace App\Jobs\CMS;

use App\Models\CMS\WebhookLog;
use App\Models\Settings\WebhookSettings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendWebhookNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public array $endpoint;
    public array $payload;
    public string $eventType;
    public int $attemptNumber;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public int $backoff = 60;

    /**
     * Create a new job instance.
     */
    public function __construct(
        array $endpoint,
        array $payload,
        string $eventType,
        int $attemptNumber = 1
    ) {
        $this->endpoint = $endpoint;
        $this->payload = $payload;
        $this->eventType = $eventType;
        $this->attemptNumber = $attemptNumber;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $startTime = microtime(true);
        $settings = app(WebhookSettings::class);

        $url = $this->endpoint['url'];
        $secret = $this->endpoint['secret'] ?? null;
        $name = $this->endpoint['name'] ?? 'Unnamed Endpoint';

        try {
            // Generate signature if secret is provided
            $signature = $secret 
                ? hash_hmac('sha256', json_encode($this->payload), $secret)
                : null;

            // Build request
            $request = Http::timeout($settings->timeout_seconds)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'X-Webhook-Event' => $this->eventType,
                    'X-Webhook-Timestamp' => now()->toIso8601String(),
                    'X-Webhook-Attempt' => (string) $this->attemptNumber,
                ]);

            if ($signature) {
                $request->withHeaders([
                    'X-Webhook-Signature' => $signature,
                ]);
            }

            // Send request
            $response = $request->post($url, $this->payload);

            $durationMs = (int) ((microtime(true) - $startTime) * 1000);

            if ($response->successful()) {
                $this->logSuccess($response, $durationMs, $name);
            } else {
                $this->logFailure(
                    $response->status(),
                    $response->body(),
                    $durationMs,
                    $name
                );

                // Retry if we have attempts left
                if ($this->attemptNumber < $settings->retry_attempts) {
                    $this->retryWebhook();
                }
            }
        } catch (\Exception $e) {
            $durationMs = (int) ((microtime(true) - $startTime) * 1000);

            $this->logError($e, $durationMs, $name);

            // Retry if we have attempts left
            if ($this->attemptNumber < $settings->retry_attempts) {
                $this->retryWebhook();
            }

            Log::warning('Webhook delivery failed', [
                'endpoint' => $url,
                'event' => $this->eventType,
                'error' => $e->getMessage(),
                'attempt' => $this->attemptNumber,
            ]);
        }
    }

    /**
     * Log successful webhook delivery.
     */
    protected function logSuccess($response, int $durationMs, string $name): void
    {
        WebhookLog::create([
            'event_type' => $this->eventType,
            'endpoint_url' => $this->endpoint['url'],
            'endpoint_name' => $name,
            'status' => WebhookLog::STATUS_SUCCESS,
            'http_status' => $response->status(),
            'request_payload' => json_encode($this->payload),
            'response_body' => substr($response->body(), 0, 5000),
            'attempt_number' => $this->attemptNumber,
            'duration_ms' => $durationMs,
        ]);
    }

    /**
     * Log failed webhook delivery.
     */
    protected function logFailure(int $httpStatus, string $responseBody, int $durationMs, string $name): void
    {
        WebhookLog::create([
            'event_type' => $this->eventType,
            'endpoint_url' => $this->endpoint['url'],
            'endpoint_name' => $name,
            'status' => WebhookLog::STATUS_FAILED,
            'http_status' => $httpStatus,
            'request_payload' => json_encode($this->payload),
            'response_body' => substr($responseBody, 0, 5000),
            'attempt_number' => $this->attemptNumber,
            'duration_ms' => $durationMs,
        ]);
    }

    /**
     * Log error during webhook delivery.
     */
    protected function logError(\Exception $e, int $durationMs, string $name): void
    {
        WebhookLog::create([
            'event_type' => $this->eventType,
            'endpoint_url' => $this->endpoint['url'],
            'endpoint_name' => $name,
            'status' => WebhookLog::STATUS_FAILED,
            'request_payload' => json_encode($this->payload),
            'error_message' => $e->getMessage(),
            'attempt_number' => $this->attemptNumber,
            'duration_ms' => $durationMs,
        ]);
    }

    /**
     * Schedule a retry.
     */
    protected function retryWebhook(): void
    {
        $backoffSeconds = $this->backoff * $this->attemptNumber;

        dispatch(new self(
            $this->endpoint,
            $this->payload,
            $this->eventType,
            $this->attemptNumber + 1
        ))->delay(now()->addSeconds($backoffSeconds));
    }
}
