<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Interfaces\PermissionInterface;
use App\Interfaces\RoleInterface;

class TestPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * This seeder is idempotent and intended to be used in the testing
     * environment to ensure roles and permissions exist deterministically.
     *
     * @return void
     */
    public function run()
    {
        // Ensure Spatie cache is clear before/after seeding
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Collect all permission strings from PermissionInterface::ALL_PERMISSIONS
        $permissions = [];
        foreach (PermissionInterface::ALL_PERMISSIONS as $group) {
            foreach ($group as $perm) {
                $permissions[] = $perm;
            }
        }
        $permissions = array_values(array_unique($permissions));

        // Create all permissions (idempotent)
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        // Create roles and assign permissions
        // Admin -> all permissions
        $admin = Role::firstOrCreate([
            'name' => RoleInterface::ADMIN,
            'guard_name' => 'web'
        ]);
        $admin->givePermissionTo($permissions);

        // Super -> keep empty (application expects a Super role to exist)
        Role::firstOrCreate([
            'name' => RoleInterface::SUPER,
            'guard_name' => 'web'
        ]);

        // User -> limited permissions (common view permissions)
        $user = Role::firstOrCreate([
            'name' => RoleInterface::USER,
            'guard_name' => 'web'
        ]);
        $userPerms = [
            PermissionInterface::VIEW_ADMIN,
            PermissionInterface::VIEW_CMS,
            PermissionInterface::VIEW_FILE_MANAGER,
            PermissionInterface::VIEW_PROFILE,
        ];
        $user->givePermissionTo($userPerms);

        // Student -> relevant student permissions
        $student = Role::firstOrCreate([
            'name' => RoleInterface::STUDENT,
            'guard_name' => 'web'
        ]);
        $student->givePermissionTo([
            PermissionInterface::VIEW_STUDENT_ADMIN,
            PermissionInterface::EDIT_STUDENT_ADMIN,
            PermissionInterface::VIEW_PROFILE,
        ]);

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
