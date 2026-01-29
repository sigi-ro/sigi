<?php

namespace App\Observers\CMS;

use App\Events\CMS\PagePublished;
use App\Models\CMS\Page;
use App\Models\CMS\Url;

class UrlObserver
{
    /**
     * Handle the Url "updated" event.
     * Fire webhook events when page URLs are published/unpublished.
     */
    public function updated(Url $url): void
    {
        // Only care about Page URLs
        if ($url->urlable_type !== Page::class) {
            return;
        }

        // Check if is_enabled changed
        if (!$url->wasChanged('is_enabled')) {
            return;
        }

        $page = $url->urlable;
        
        if (!$page instanceof Page) {
            return;
        }

        if ($url->is_enabled) {
            // Page was published
            event(new PagePublished($page, 'published'));
        } else {
            // Page was unpublished
            event(new PagePublished($page, 'unpublished'));
        }
    }

    /**
     * Handle the Url "created" event.
     * Fire webhook when a page URL is created as enabled.
     */
    public function created(Url $url): void
    {
        // Only care about Page URLs
        if ($url->urlable_type !== Page::class) {
            return;
        }

        // Only fire if created as enabled
        if (!$url->is_enabled) {
            return;
        }

        $page = $url->urlable;
        
        if (!$page instanceof Page) {
            return;
        }

        event(new PagePublished($page, 'published'));
    }
}
