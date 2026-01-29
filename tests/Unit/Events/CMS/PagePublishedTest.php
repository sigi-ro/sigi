<?php

namespace Tests\Unit\Events\CMS;

use App\Events\CMS\PagePublished;
use App\Models\CMS\Page;
use App\Models\CMS\Template;
use App\Models\CMS\Url;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @group unit
 * @group fast
 * @group webhooks
 */
class PagePublishedTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function it_stores_page_and_action(): void
    {
        $page = $this->createMockPage();

        $event = new PagePublished($page, 'published');

        $this->assertSame($page, $event->page);
        $this->assertEquals('published', $event->action);
    }

    /**
     * @test
     */
    public function it_defaults_to_published_action(): void
    {
        $page = $this->createMockPage();

        $event = new PagePublished($page);

        $this->assertEquals('published', $event->action);
    }

    /**
     * @test
     */
    public function it_returns_correct_webhook_event_type_for_published(): void
    {
        $page = $this->createMockPage();

        $event = new PagePublished($page, 'published');

        $this->assertEquals('page.published', $event->getWebhookEventType());
    }

    /**
     * @test
     */
    public function it_returns_correct_webhook_event_type_for_unpublished(): void
    {
        $page = $this->createMockPage();

        $event = new PagePublished($page, 'unpublished');

        $this->assertEquals('page.unpublished', $event->getWebhookEventType());
    }

    /**
     * @test
     */
    public function it_generates_webhook_payload_with_page_data(): void
    {
        $page = $this->createMockPage([
            'id' => 123,
            'name' => 'Test Page',
            'slug' => 'test-page',
        ]);

        $event = new PagePublished($page, 'published');
        $payload = $event->getWebhookPayload();

        $this->assertArrayHasKey('event', $payload);
        $this->assertArrayHasKey('timestamp', $payload);
        $this->assertArrayHasKey('data', $payload);
        $this->assertArrayHasKey('page', $payload['data']);

        $this->assertEquals('page.published', $payload['event']);
        $this->assertEquals(123, $payload['data']['page']['id']);
        $this->assertEquals('Test Page', $payload['data']['page']['name']);
        $this->assertEquals('test-page', $payload['data']['page']['slug']);
    }

    /**
     * @test
     */
    public function it_handles_null_url_gracefully(): void
    {
        $page = $this->createMockPage([
            'id' => 1,
            'name' => 'Test',
            'slug' => 'test',
        ]);
        $page->setRelation('url', null);

        $event = new PagePublished($page, 'published');
        $payload = $event->getWebhookPayload();

        $this->assertNull($payload['data']['page']['url']);
    }

    /**
     * @test
     */
    public function it_handles_null_template_gracefully(): void
    {
        $page = $this->createMockPage([
            'id' => 1,
            'name' => 'Test',
            'slug' => 'test',
        ]);
        $page->setRelation('template', null);

        $event = new PagePublished($page, 'published');
        $payload = $event->getWebhookPayload();

        $this->assertNull($payload['data']['page']['template']);
    }

    /**
     * @test
     */
    public function timestamp_is_iso8601_format(): void
    {
        $page = $this->createMockPage();

        $event = new PagePublished($page, 'published');
        $payload = $event->getWebhookPayload();

        // ISO 8601 format: 2026-01-28T12:00:00+00:00
        $this->assertMatchesRegularExpression(
            '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/',
            $payload['timestamp']
        );
    }

    /**
     * Create a mock Page object using partial mocking with mass assignment.
     */
    protected function createMockPage(array $attributes = []): Page
    {
        $defaults = [
            'id' => 1,
            'name' => 'Test Page',
            'slug' => 'test-page',
            'updated_at' => now(),
        ];

        $attributes = array_merge($defaults, $attributes);

        // Create a Page instance without saving to DB
        $page = new Page();
        $page->forceFill($attributes);
        $page->setRelation('url', null);
        $page->setRelation('template', null);

        return $page;
    }
}
