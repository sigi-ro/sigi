<?php

namespace Tests\Feature\Admin\CMS;

use App\Interfaces\CMS\TemplateFieldInterface;
use App\Interfaces\CMS\TemplateInterface;
use App\Interfaces\PermissionInterface;
use App\Models\CMS\Content;
use App\Models\CMS\Page;
use App\Models\CMS\Template;
use App\Models\CMS\TemplateField;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class ContentTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function content_is_stored_when_page_is_created()
    {
        $template = Template::factory()
            ->has(TemplateField::factory()->count(2))
            ->create(['type' => TemplateInterface::TYPE_PAGE]);

        $layout = \App\Models\CMS\Layout::factory()->create();

        $pageData = [
            'name' => 'Test Page',
            'slug' => 'test-page',
            'layout_id' => $layout->id,
            'template_id' => $template->id,
            'url' => [
                'is_enabled' => true,
                'url_main' => 'test-page',
            ],
            'content' => [
                $template->templateFields[0]->id => [
                    'data' => 'Test Content 1',
                    'template_field_id' => $template->templateFields[0]->id,
                ],
                $template->templateFields[1]->id => [
                    'data' => 'Test Content 2',
                    'template_field_id' => $template->templateFields[1]->id,
                ],
            ],
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.cms.pages.store'), $pageData);

        $page = Page::where('slug', 'test-page')->first();
        $this->assertNotNull($page);
        $this->assertCount(2, $page->content);
    }

    /** @test */
    public function content_is_updated_when_page_is_updated()
    {
        $template = Template::factory()
            ->has(TemplateField::factory()->count(1))
            ->create(['type' => TemplateInterface::TYPE_PAGE]);

        $page = Page::factory()->create(['template_id' => $template->id]);
        $page->load('url');
        
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

        $field = $template->templateFields->first();

        $updateData = [
            'id' => $page->id,
            'name' => $page->name,
            'slug' => $page->slug,
            'layout_id' => $page->layout_id,
            'template_id' => $page->template_id,
            'url' => [
                'id' => $page->url->id,
                'is_enabled' => $page->url->is_enabled,
                'url_main' => $page->url->url_main,
            ],
            'content' => [
                $field->id => [
                    'data' => 'Updated Content',
                    'template_field_id' => $field->id,
                ],
            ],
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.cms.pages.update', $page), $updateData);

        $page->refresh();
        $content = $page->content->where('template_field_id', $field->id)->first();
        $this->assertEquals('Updated Content', $content->data);
    }
}

