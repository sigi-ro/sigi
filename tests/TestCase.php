<?php

namespace Tests;

use App\Actions\Landlord\Tenant\TenantStoreAction;
use App\Interfaces\PermissionInterface;
use App\Interfaces\RoleInterface;
use App\Models\Tenant;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;
use PHPUnit\Framework\Assert;
use Spatie\Permission\PermissionRegistrar;
use Database\Seeders\TestPermissionsSeeder;

/**
 * Class TestCase
 * @package Tests
 *
 * Inertia specific assertion methods
 * @method $this assertHasProp($key)
 * @method $this assertPropCount($key, $count)
 * @method $this assertPropValue($key, $value)
 * @method array props($key)
 */
abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected bool $tenancy = false;
    protected ?Tenant $tenant = null;

    /**
     * @var Faker
     */
    protected $faker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->inertiaSetup();
        $this->faker = Faker::create();
        config(['tenancy.database.prefix' => 'test_tenant_']);
        // Ensure both landlord and tenant migrations run in the in-memory
        // testing database. Migrations in this project are split into
        // `database/migrations/landlord` and `database/migrations/tenant`.
        // Running them here guarantees the permission tables, roles and
        // tenant-specific tables exist for tests that rely on them.
        // Migration application is handled by the RefreshDatabase trait
        // and the migrator. We previously attempted to run migrations
        // here manually which caused duplicate-migration issues. The
        // test environment now registers the landlord/tenant migration
        // folders via AppServiceProvider so RefreshDatabase will include
        // them automatically.

        // Clear permission cache before each test so freshly created/assigned
        // permissions are respected by authorization checks.
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Seed deterministic permissions and roles for tests. This ensures
        // middleware checks and permission lookups are reliable without
        // requiring manual seeding steps.
        if (app()->environment('testing')) {
            $this->artisan('db:seed', ['--class' => TestPermissionsSeeder::class]);
        }
    }

    protected function createTenant(array $data = [], string $domain = null): Tenant
    {
        // Use unique ID to avoid database conflicts, but reuse if tenant exists
        $data = array_merge(
            [
                'id' => 'test-' . ($domain ?? 'default')
            ],
            $data
        );

        $domain = $domain ?? 'test-' . Str::random('10');

        // Check if tenant already exists
        $existingTenant = \App\Models\Tenant::find($data['id']);
        if ($existingTenant) {
            $this->tenant = $existingTenant;
            return $this->tenant;
        }

        $this->tenant = app(TenantStoreAction::class)->handle($data, $domain);

        return $this->tenant;
    }


    protected function tearDown(): void
    {
        // RefreshDatabase trait handles cleanup automatically
        // migrate:reset is inefficient and unnecessary here
        parent::tearDown();
    }

    /**
     * Define the Inertia specific assertions.
     * Taken from: https://github.com/inertiajs/pingcrm/blob/master/tests/TestCase.php
     */
    protected function inertiaSetup(): void {
        TestResponse::macro('props', function ($key = null) {
            $props = json_decode(json_encode($this->original->getData()['page']['props']), JSON_OBJECT_AS_ARRAY);

            if ($key) {
                return Arr::get($props, $key);
            }

            return $props;
        });

        TestResponse::macro('assertHasProp', function ($key) {
            Assert::assertTrue(Arr::has($this->props(), $key));

            return $this;
        });

        TestResponse::macro('assertPropValue', function ($key, $value) {
            $this->assertHasProp($key);

            if (is_callable($value)) {
                $value($this->props($key));
            } else {
                Assert::assertEquals($this->props($key), $value);
            }

            return $this;
        });

        TestResponse::macro('assertPropCount', function ($key, $count) {
            $this->assertHasProp($key);

            Assert::assertCount($count, $this->props($key));

            return $this;
        });
    }


    /**
     * Sign in with a user
     * @param User|null $user
     * @return $this
     */
    protected function signIn(User $user = null)
    {
        $user = $user ?: User::factory()->create();

        $this->actingAs($user);

        // Clear permission cache so recently assigned permissions are recognised
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Navigating to admin ensures that any 'redirect back' go to admin index instead of web index
        // Going to web index causes issues when following redirects and web routes are not disabled
        // As an additional redirect to admin causes any shared data to be lost from the response
        $this->get(route('admin.index'));

        return $this;
    }

    /**
     * Sign in with a user and give the provided permission(s).
     * @param string|array $permissions
     * @param User|null $user
     * @return $this
     */
    protected function signInWithPermissions($permissions, User $user = null)
    {
        $user = $user ?: User::factory()->create();
        
        // Ensure user has VIEW_ADMIN permission to access admin routes
        $permissionsArray = is_array($permissions) ? $permissions : [$permissions];
        if (!in_array(PermissionInterface::VIEW_ADMIN, $permissionsArray)) {
            $permissionsArray[] = PermissionInterface::VIEW_ADMIN;
        }
        
        $user->givePermissionTo($permissionsArray);

        return $this->signIn($user);
    }


    /**
     * Sign in with a user and assign the provided role.
     * @param string $role
     * @param User|null $user
     * @return $this
     */
    protected function signInWithRole(string $role, User $user = null)
    {
        $user = $user ?: User::factory()->create();
        $user->assignRole($role);

        return $this->signIn($user);
    }

    /**
     * Sign in with a user and assign the Super role.
     * @param User|null $user
     * @return $this
     */
    protected function signInWithSuperRole(User $user = null)
    {
        return $this->signInWithRole(RoleInterface::SUPER, $user);
    }

    /**
     * Sign in with a user and assign the Admin role.
     * @param User|null $user
     * @return $this
     */
    protected function signInWithAdminRole(User $user = null)
    {
        return $this->signInWithRole(RoleInterface::ADMIN, $user);
    }

    /**
     * Sign in with a user and assign the Super role.
     * @param User|null $user
     * @return $this
     */
    protected function signInWithUserRole(User $user = null)
    {
        return $this->signInWithRole(RoleInterface::USER, $user);
    }
}
