<?php

namespace Tests\Feature\Admin\CMS;

use App\Interfaces\PermissionInterface;
use App\Models\CMS\Menu;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class MenuTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_menus()
    {
        Menu::factory()->count(3)->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.menus.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_create_menus()
    {
        $response = $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.menus.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_store_menus()
    {
        $menuData = [
            'name' => 'Test Menu',
            'slug' => 'test-menu',
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.cms.menus.store'), $menuData);

        $this->assertDatabaseHas('cms_menus', [
            'slug' => 'test-menu',
            'name' => 'Test Menu',
        ]);
    }

    /** @test */
    public function authorised_users_can_edit_menus()
    {
        $menu = Menu::factory()->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.cms.menus.edit', $menu));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_update_menus()
    {
        $menu = Menu::factory()->create();

        $updateData = [
            'name' => 'Updated Menu',
            'slug' => $menu->slug,
        ];

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.cms.menus.update', $menu), $updateData);

        $response->assertStatus(302);

        $menu->refresh();
        $this->assertEquals('Updated Menu', $menu->name);
    }

    /** @test */
    public function authorised_users_can_delete_menus()
    {
        $menu = Menu::factory()->create();

        $this
            ->signInWithPermissions([
                PermissionInterface::DELETE_CMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->delete(route('admin.cms.menus.destroy', $menu));

        $this->assertDatabaseMissing('cms_menus', ['id' => $menu->id]);
    }
}

