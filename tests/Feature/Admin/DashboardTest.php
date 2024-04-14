<?php

namespace Tests\Feature\Admin;

use App\Interfaces\PermissionInterface;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    protected bool $tenancy = true;

    /** @test  */
    public function authorised_users_can_view_the_dashboard()
    {
        $response = $this
            ->signInWithPermissions(PermissionInterface::VIEW_ADMIN)
            ->get(route('admin.index'));

        $response->assertStatus(200);
    }

    /** @test  */
    public function unauthorised_users_cannot_view_the_dashboard()
    {
        $response = $this->get(route('admin.index'));
        $response->assertRedirect(route('login'));
    }
}
