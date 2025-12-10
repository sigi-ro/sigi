<?php

namespace Tests\Feature\Admin\CMS;

use App\Interfaces\CMS\TemplateInterface;
use App\Interfaces\PermissionInterface;
use App\Models\CMS\Layout;
use App\Models\CMS\Page;
use App\Models\CMS\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class PageTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_pages()
    {
        Page::factory()->count(3)->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.pages.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_create_pages()
    {
        $layout = Layout::factory()->create();
        $template = Template::factory()->create(['type' => TemplateInterface::TYPE_PAGE]);

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.pages.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_store_pages()
    {
        $layout = Layout::factory()->create();
        $template = Template::factory()->create(['type' => TemplateInterface::TYPE_PAGE]);

        $pageData = [
            'name' => 'Test Page',
            'slug' => 'test-page',
            'layout_id' => $layout->id,
            'template_id' => $template->id,
            'url' => [
                'is_enabled' => true,
                'url_main' => 'test-page',
            ],
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.cms.pages.store'), $pageData);

        $this->assertDatabaseHas('cms_pages', [
            'slug' => 'test-page',
            'name' => 'Test Page',
        ]);
    }

    /** @test */
    public function authorised_users_can_edit_pages()
    {
        $page = Page::factory()->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.pages.edit', $page));

        $response
            ->assertStatus(200)
            ->assertPropValue('page.id', $page->id);
    }

    /** @test */
    public function authorised_users_can_update_pages()
    {
        $page = Page::factory()->create();
        $layout = Layout::factory()->create();
        $page->load('url');
        
        // Ensure URL exists
        if (!$page->url) {
            $page->url()->create([
                'url_main' => $page->slug,
                'url_full' => '/' . $page->slug,
                'is_enabled' => true,
                'published_at' => now(),
            ]);
            $page->refresh();
            $page->load('url');
        }

        $updateData = [
            'id' => $page->id,
            'name' => 'Updated Page Name',
            'slug' => $page->slug,
            'layout_id' => $layout->id,
            'template_id' => $page->template_id,
            'url' => [
                'id' => $page->url->id,
                'is_enabled' => $page->url->is_enabled,
                'url_main' => $page->url->url_main,
            ],
        ];

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.cms.pages.update', $page), $updateData);

        $response->assertStatus(302);

        $page->refresh();
        $this->assertEquals('Updated Page Name', $page->name);
    }

    /** @test */
    public function authorised_users_can_delete_pages()
    {
        $page = Page::factory()->create();

        $this
            ->signInWithPermissions([
                PermissionInterface::DELETE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->delete(route('admin.cms.pages.destroy', $page));

        $this->assertDatabaseMissing('cms_pages', ['id' => $page->id]);
    }

    /** @test */
    public function unauthorised_users_cannot_view_pages()
    {
        $this->assertIsPermissionAuthenticatedRoute(route('admin.cms.pages.index'));
    }

    /** @test */
    public function unauthorised_users_cannot_create_pages()
    {
        $this->assertIsPermissionAuthenticatedRoute(route('admin.cms.pages.create'));
    }

    /** @test */
    public function unauthorised_users_cannot_edit_pages()
    {
        $page = Page::factory()->create();
        $this->assertIsPermissionAuthenticatedRoute(route('admin.cms.pages.edit', $page));
    }

    /** @test */
    public function unauthorised_users_cannot_delete_pages()
    {
        $page = Page::factory()->create();
        $this->assertIsPermissionAuthenticatedRoute(route('admin.cms.pages.destroy', $page), 'delete');
    }
}

