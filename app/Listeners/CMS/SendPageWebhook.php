<?php

namespace App\Listeners\CMS;

use App\Events\CMS\PagePublished;
use App\Jobs\CMS\SendWebhookNotification;
use App\Models\Settings\WebhookSettings;

class SendPageWebhook
{
    /**
     * Handle the event.
     */
    public function handle(PagePublished $event): void
    {
        $settings = app(WebhookSettings::class);

        if (!$settings->enabled) {
            return;
        }

        $eventType = $event->getWebhookEventType();
        $payload = $event->getWebhookPayload();
        $endpoints = $settings->getEndpointsForEvent($eventType);

        foreach ($endpoints as $endpoint) {
            dispatch(new SendWebhookNotification(
                $endpoint,
                $payload,
                $eventType
            ));
        }
    }
}
