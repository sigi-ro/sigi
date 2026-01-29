<?php

namespace App\Models\Settings;

use Spatie\LaravelSettings\Settings;

/**
 * Webhook configuration settings for the tenant.
 * 
 * Endpoints structure:
 * [
 *     [
 *         'url' => 'https://example.com/webhook',
 *         'secret' => 'shared-secret-for-signature',
 *         'events' => ['page.published', 'page.unpublished'],
 *         'is_active' => true,
 *         'name' => 'Production Site Rebuild',
 *     ],
 *     ...
 * ]
 */
class WebhookSettings extends Settings
{
    /**
     * Array of webhook endpoint configurations.
     */
    public array $endpoints = [];

    /**
     * Whether webhooks are globally enabled for this tenant.
     */
    public bool $enabled = true;

    /**
     * Number of retry attempts for failed webhooks.
     */
    public int $retry_attempts = 3;

    /**
     * Timeout in seconds for webhook requests.
     */
    public int $timeout_seconds = 30;

    public static function group(): string
    {
        return 'webhooks';
    }

    /**
     * Get active endpoints for a specific event.
     */
    public function getEndpointsForEvent(string $event): array
    {
        if (!$this->enabled) {
            return [];
        }

        return array_filter($this->endpoints, function ($endpoint) use ($event) {
            return ($endpoint['is_active'] ?? true) 
                && in_array($event, $endpoint['events'] ?? []);
        });
    }

    /**
     * Get all available webhook events.
     */
    public static function availableEvents(): array
    {
        return [
            'page.published' => 'Page Published',
            'page.unpublished' => 'Page Unpublished',
            'page.updated' => 'Page Updated',
            'page.deleted' => 'Page Deleted',
            'layout.updated' => 'Layout Updated',
            'menu.updated' => 'Menu Updated',
            'form.submitted' => 'Form Submitted',
        ];
    }
}
