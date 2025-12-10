<?php

namespace Tests\Feature\Admin\CRM;

use App\Interfaces\PermissionInterface;
use App\Models\CRM\Form;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class FormTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_forms()
    {
        Form::factory()->count(3)->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.forms.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_create_forms()
    {
        $response = $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.forms.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_store_forms()
    {
        $formData = [
            'name' => 'Test Form',
            'slug' => 'test-form',
            'email_recipients' => 'test@example.com',
            'success_message' => 'Thank you!',
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.crm.forms.store'), $formData);

        $this->assertDatabaseHas('crm_forms', [
            'slug' => 'test-form',
            'name' => 'Test Form',
        ]);
    }

    /** @test */
    public function authorised_users_can_edit_forms()
    {
        $form = Form::factory()->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.forms.edit', $form));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_update_forms()
    {
        $form = Form::factory()->create();

        $updateData = [
            'name' => 'Updated Form',
            'slug' => $form->slug,
            'email_recipients' => 'updated@example.com',
            'success_message' => 'Updated message',
        ];

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.crm.forms.update', $form), $updateData);

        $response->assertStatus(302);

        $form->refresh();
        $this->assertEquals('Updated Form', $form->name);
    }

    /** @test */
    public function authorised_users_can_delete_forms()
    {
        $form = Form::factory()->create();

        $this
            ->signInWithPermissions([
                PermissionInterface::DELETE_CRM_FORMS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->delete(route('admin.crm.forms.destroy', $form));

        $form->refresh();
        $this->assertNotNull($form->deleted_at);
    }

    /** @test */
    public function unauthorised_users_cannot_view_forms()
    {
        $this->assertIsPermissionAuthenticatedRoute(route('admin.crm.forms.index'));
    }

    /** @test */
    public function unauthorised_users_cannot_create_forms()
    {
        $this->assertIsPermissionAuthenticatedRoute(route('admin.crm.forms.create'));
    }
}

