<?php

namespace App\Events\CMS;

use App\Models\CMS\Page;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PagePublished
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Page $page;
    public string $action;

    /**
     * Create a new event instance.
     *
     * @param Page $page The page that was published/unpublished
     * @param string $action Either 'published' or 'unpublished'
     */
    public function __construct(Page $page, string $action = 'published')
    {
        $this->page = $page;
        $this->action = $action;
    }

    /**
     * Get the webhook event type.
     */
    public function getWebhookEventType(): string
    {
        return 'page.' . $this->action;
    }

    /**
     * Get the payload for webhook delivery.
     */
    public function getWebhookPayload(): array
    {
        return [
            'event' => $this->getWebhookEventType(),
            'timestamp' => now()->toIso8601String(),
            'data' => [
                'page' => [
                    'id' => $this->page->id,
                    'name' => $this->page->name,
                    'slug' => $this->page->slug,
                    'url' => $this->page->url?->url_full,
                    'template' => $this->page->template?->slug,
                    'updated_at' => $this->page->updated_at?->toIso8601String(),
                ],
            ],
        ];
    }
}
