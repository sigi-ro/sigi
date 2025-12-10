<?php

namespace Tests\Feature\Admin\CRM;

use App\Interfaces\PermissionInterface;
use App\Models\CRM\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class ContactTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_contacts()
    {
        Contact::factory()->count(3)->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.contacts.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_create_contacts()
    {
        $response = $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.contacts.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_store_contacts()
    {
        $contactData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ];

        $this
            ->signInWithPermissions([
                PermissionInterface::CREATE_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->post(route('admin.crm.contacts.store'), $contactData);

        $this->assertDatabaseHas('crm_contacts', [
            'email' => 'john@example.com',
            'first_name' => 'John',
        ]);
    }

    /** @test */
    public function authorised_users_can_edit_contacts()
    {
        $contact = Contact::factory()->create();

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.contacts.edit', $contact));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_update_contacts()
    {
        $contact = Contact::factory()->create();

        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $contact->last_name,
            'email' => $contact->email,
        ];

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::EDIT_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->put(route('admin.crm.contacts.update', $contact), $updateData);

        $response->assertStatus(302);

        $contact->refresh();
        $this->assertEquals('Jane', $contact->first_name);
    }

    /** @test */
    public function authorised_users_can_delete_contacts()
    {
        $contact = Contact::factory()->create();

        $this
            ->signInWithPermissions([
                PermissionInterface::DELETE_CRM_CONTACTS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->delete(route('admin.crm.contacts.destroy', $contact));

        $contact->refresh();
        $this->assertNotNull($contact->deleted_at);
    }
}

