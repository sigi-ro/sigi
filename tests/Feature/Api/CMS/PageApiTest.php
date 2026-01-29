<?php

namespace Tests\Feature\Api\CMS;

use App\Models\CMS\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TenantTestCase;

/**
 * @group api
 * @group cms
 */
class PageApiTest extends TenantTestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_all_pages()
    {
        Page::factory()->count(5)->create();

        $response = $this->getJson(route('api.pages.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'name',
                    'slug',
                ]
            ]);
    }

    /** @test */
    public function can_get_page_by_slug()
    {
        $page = Page::factory()->create();
        $page->refresh();
        
        // Ensure page has published URL
        if (!$page->url) {
            try {
                $page->url()->create([
                    'url_main' => $page->slug,
                    'url_full' => '/' . $page->slug,
                    'is_enabled' => true,
                    'published_at' => now(),
                ]);
            } catch (\Exception $e) {
                // URL might already exist
            }
        } else {
            $page->url->update([
                'is_enabled' => true,
                'published_at' => now(),
            ]);
        }
        $page->refresh();

        $response = $this->getJson(route('api.pages.show', ['slug' => $page->slug]));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'name',
                'slug',
            ])
            ->assertJson([
                'slug' => $page->slug,
            ]);
    }

    /** @test */
    public function returns_404_for_non_existent_page()
    {
        $response = $this->getJson(route('api.pages.show', ['slug' => 'non-existent']));

        $response->assertStatus(404);
    }
}

