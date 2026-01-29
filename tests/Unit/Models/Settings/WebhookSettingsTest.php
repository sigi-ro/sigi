<?php

namespace Tests\Unit\Models\Settings;

use App\Models\Settings\WebhookSettings;
use PHPUnit\Framework\TestCase;

/**
 * @group unit
 * @group fast
 * @group webhooks
 */
class WebhookSettingsTest extends TestCase
{
    /**
     * @test
     */
    public function it_returns_correct_settings_group(): void
    {
        $this->assertEquals('webhooks', WebhookSettings::group());
    }

    /**
     * @test
     */
    public function it_returns_all_available_events(): void
    {
        $events = WebhookSettings::availableEvents();

        $this->assertIsArray($events);
        $this->assertArrayHasKey('page.published', $events);
        $this->assertArrayHasKey('page.unpublished', $events);
        $this->assertArrayHasKey('page.updated', $events);
        $this->assertArrayHasKey('page.deleted', $events);
        $this->assertArrayHasKey('layout.updated', $events);
        $this->assertArrayHasKey('menu.updated', $events);
        $this->assertArrayHasKey('form.submitted', $events);
    }

    /**
     * @test
     */
    public function it_returns_correct_event_labels(): void
    {
        $events = WebhookSettings::availableEvents();

        $this->assertEquals('Page Published', $events['page.published']);
        $this->assertEquals('Page Unpublished', $events['page.unpublished']);
        $this->assertEquals('Form Submitted', $events['form.submitted']);
    }

    /**
     * @test
     */
    public function available_events_count_is_correct(): void
    {
        $events = WebhookSettings::availableEvents();

        $this->assertCount(7, $events);
    }
}
