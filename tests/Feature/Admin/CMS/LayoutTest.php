<?php

namespace Tests\Feature\Admin\CMS;

use App\Interfaces\PermissionInterface;
use App\Models\CMS\Layout;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class LayoutTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_layouts()
    {
        Layout::factory()->count(3)->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.layouts.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_create_layouts()
    {
        $response = $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS_ADVANCED,
                PermissionInterface::VIEW_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.layouts.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_store_layouts()
    {
        $template = \App\Models\CMS\Template::factory()->create(['type' => \App\Interfaces\CMS\TemplateInterface::TYPE_LAYOUT]);
        
        $layoutData = [
            'name' => 'Test Layout',
            'slug' => 'test-layout',
            'template_id' => $template->id,
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.cms.layouts.store'), $layoutData);

        $this->assertDatabaseHas('cms_layouts', [
            'slug' => 'test-layout',
            'name' => 'Test Layout',
        ]);
    }

    /** @test */
    public function authorised_users_can_edit_layouts()
    {
        $layout = Layout::factory()->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS_ADVANCED,
                PermissionInterface::VIEW_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.layouts.edit', $layout));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_update_layouts()
    {
        $layout = Layout::factory()->create();

        $updateData = [
            'name' => 'Updated Layout',
            'slug' => $layout->slug,
            'template_id' => $layout->template_id,
        ];

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.cms.layouts.update', $layout), $updateData);

        $response->assertStatus(302);

        $layout->refresh();
        $this->assertEquals('Updated Layout', $layout->name);
    }

    /** @test */
    public function authorised_users_can_delete_layouts()
    {
        $layout = Layout::factory()->create();

        $this
            ->signInWithPermissions([
                PermissionInterface::DELETE_CMS_ADVANCED,
                PermissionInterface::VIEW_ADMIN
            ])
            ->delete(route('admin.cms.layouts.destroy', $layout));

        $this->assertDatabaseMissing('cms_layouts', ['id' => $layout->id]);
    }
}

