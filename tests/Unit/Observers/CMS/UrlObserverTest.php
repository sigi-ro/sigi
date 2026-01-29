<?php

namespace Tests\Unit\Observers\CMS;

use App\Events\CMS\PagePublished;
use App\Models\CMS\Page;
use App\Models\CMS\Url;
use App\Observers\CMS\UrlObserver;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Mockery;
use Tests\TestCase;

/**
 * @group unit
 * @group fast
 * @group webhooks
 */
class UrlObserverTest extends TestCase
{
    use RefreshDatabase;
    
    protected UrlObserver $observer;

    public function setUp(): void
    {
        parent::setUp();
        $this->observer = new UrlObserver();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * @test
     */
    public function updated_fires_published_event_when_url_enabled(): void
    {
        Event::fake([PagePublished::class]);

        $page = Mockery::mock(Page::class);
        
        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('wasChanged')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('urlable')->andReturn($page);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = true;
        $url->urlable = $page;

        $this->observer->updated($url);

        Event::assertDispatched(PagePublished::class, function ($event) use ($page) {
            return $event->page === $page && $event->action === 'published';
        });
    }

    /**
     * @test
     */
    public function updated_fires_unpublished_event_when_url_disabled(): void
    {
        Event::fake([PagePublished::class]);

        $page = Mockery::mock(Page::class);
        
        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('wasChanged')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(false);
        $url->shouldReceive('getAttribute')->with('urlable')->andReturn($page);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = false;
        $url->urlable = $page;

        $this->observer->updated($url);

        Event::assertDispatched(PagePublished::class, function ($event) use ($page) {
            return $event->page === $page && $event->action === 'unpublished';
        });
    }

    /**
     * @test
     */
    public function updated_does_not_fire_event_for_non_page_urls(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn('App\\Models\\CMS\\Layout');
        
        $url->urlable_type = 'App\\Models\\CMS\\Layout';

        $this->observer->updated($url);

        Event::assertNotDispatched(PagePublished::class);
    }

    /**
     * @test
     */
    public function updated_does_not_fire_event_when_is_enabled_not_changed(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('wasChanged')->with('is_enabled')->andReturn(false);
        
        $url->urlable_type = Page::class;

        $this->observer->updated($url);

        Event::assertNotDispatched(PagePublished::class);
    }

    /**
     * @test
     */
    public function updated_does_not_fire_event_when_urlable_is_not_page_instance(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('wasChanged')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('urlable')->andReturn(null);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = true;
        $url->urlable = null;

        $this->observer->updated($url);

        Event::assertNotDispatched(PagePublished::class);
    }

    /**
     * @test
     */
    public function created_fires_published_event_when_created_as_enabled(): void
    {
        Event::fake([PagePublished::class]);

        $page = Mockery::mock(Page::class);
        
        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('urlable')->andReturn($page);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = true;
        $url->urlable = $page;

        $this->observer->created($url);

        Event::assertDispatched(PagePublished::class, function ($event) use ($page) {
            return $event->page === $page && $event->action === 'published';
        });
    }

    /**
     * @test
     */
    public function created_does_not_fire_event_when_created_as_disabled(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(false);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = false;

        $this->observer->created($url);

        Event::assertNotDispatched(PagePublished::class);
    }

    /**
     * @test
     */
    public function created_does_not_fire_event_for_non_page_urls(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn('App\\Models\\CMS\\Layout');
        
        $url->urlable_type = 'App\\Models\\CMS\\Layout';

        $this->observer->created($url);

        Event::assertNotDispatched(PagePublished::class);
    }

    /**
     * @test
     */
    public function created_does_not_fire_event_when_urlable_is_not_page_instance(): void
    {
        Event::fake([PagePublished::class]);

        $url = Mockery::mock(Url::class)->makePartial();
        $url->shouldReceive('getAttribute')->with('urlable_type')->andReturn(Page::class);
        $url->shouldReceive('getAttribute')->with('is_enabled')->andReturn(true);
        $url->shouldReceive('getAttribute')->with('urlable')->andReturn(null);
        
        $url->urlable_type = Page::class;
        $url->is_enabled = true;
        $url->urlable = null;

        $this->observer->created($url);

        Event::assertNotDispatched(PagePublished::class);
    }
}
