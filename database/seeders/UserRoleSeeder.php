<?php

namespace Database\Seeders;

use App\Interfaces\RoleInterface;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $originalDriver = auth()->getDefaultDriver();
        auth()->setDefaultDriver('web');

        // Create Admin user (idempotent)
        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'first_name'    => 'Admin',
                'last_name'     => 'Account',
                'password'      => Hash::make('AdminPassword')
            ]
        );
        if (!$user->hasRole(RoleInterface::ADMIN)) {
            $user->assignRole(Role::whereName(RoleInterface::ADMIN)->first());
        }
        if (!$user->hasRole(RoleInterface::USER)) {
            $user->assignRole(Role::whereName(RoleInterface::USER)->first());
        }

        // Create Super user (idempotent)
        $user = User::firstOrCreate(
            ['email' => 'super@example.com'],
            [
                'first_name'    => 'Super',
                'last_name'     => 'Account',
                'password'      => Hash::make('SuperPassword')
            ]
        );
        if (!$user->hasRole(RoleInterface::ADMIN)) {
            $user->assignRole(Role::whereName(RoleInterface::ADMIN)->first());
        }
        if (!$user->hasRole(RoleInterface::SUPER)) {
            $user->assignRole(Role::whereName(RoleInterface::SUPER)->first());
        }
        if (!$user->hasRole(RoleInterface::USER)) {
            $user->assignRole(Role::whereName(RoleInterface::USER)->first());
        }

        // Create User account (idempotent)
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'first_name'    => 'User',
                'last_name'     => 'Account',
                'password'      => Hash::make('UserPassword')
            ]
        );
        if (!$user->hasRole(RoleInterface::USER)) {
            $user->assignRole(Role::whereName(RoleInterface::USER)->first());
        }

        // Create Student account (idempotent)
        $user = User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'first_name'    => 'Student',
                'last_name'     => 'Account',
                'password'      => Hash::make('StudentPassword')
            ]
        );
        if (!$user->hasRole(RoleInterface::STUDENT)) {
            $user->assignRole(Role::whereName(RoleInterface::STUDENT)->first());
        }

        auth()->setDefaultDriver($originalDriver);
    }
}
