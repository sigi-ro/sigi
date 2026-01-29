<?php

namespace Tests;

use Database\Seeders\EmptySeeder;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\DB;
use Stancl\Tenancy\TenantDatabaseManagers\SQLiteDatabaseManager;

abstract class TenantTestCase extends TestCase
{
    /**
     * Create tenant and initialize tenancy?
     */
    protected bool $tenancy = true;
    protected bool $shouldSeed = true;

    /**
     * Track tenant across tests in the same class to avoid recreation overhead.
     * Each test class gets its own tenant, reused across test methods.
     */
    protected static ?\App\Models\Tenant $sharedTenant = null;
    protected static ?string $sharedTenantClass = null;

    public function setUp(): void
    {
        parent::setUp();

        if (!$this->shouldSeed) {
            config(['tenancy.seeder_parameters.--class' => EmptySeeder::class]);
        }

        if ($this->tenancy) {
            $this->initializeTenancy();
        }
    }

    /**
     * Initialize tenancy, reusing tenant within the same test class.
     */
    protected function initializeTenancy(): void
    {
        $currentClass = static::class;
        
        // Reuse tenant if we're in the same test class
        if (static::$sharedTenant !== null && static::$sharedTenantClass === $currentClass) {
            $this->tenant = static::$sharedTenant;
        } else {
            // Different test class or first run - create new tenant
            if (static::$sharedTenant !== null) {
                $this->cleanupSharedTenant();
            }
            
            $domain = 'phpunit-' . crc32($currentClass);
            $this->tenant = $this->createTenant(['modules' => ['CMS', 'CRM']], $domain);
            static::$sharedTenant = $this->tenant;
            static::$sharedTenantClass = $currentClass;
        }

        tenancy()->initialize($this->tenant);

        config(['app.url' => 'http://phpunit.localhost']);

        /** @var UrlGenerator $urlGenerator */
        $urlGenerator = url();
        $urlGenerator->forceRootUrl('http://phpunit.localhost');

        $this->withServerVariables([
            'SERVER_NAME' => 'phpunit.localhost',
            'HTTP_HOST' => 'phpunit.localhost',
        ]);

        // Seed tenant permissions (uses cached seeding from parent)
        $this->seedPermissionsOnce();
    }

    /**
     * Cleanup shared tenant when switching test classes.
     */
    protected function cleanupSharedTenant(): void
    {
        if (static::$sharedTenant !== null) {
            try {
                static::$sharedTenant->delete();
                app(SQLiteDatabaseManager::class)->deleteDatabase(static::$sharedTenant);
            } catch (\Exception $e) {
                // Ignore cleanup errors
            }
            static::$sharedTenant = null;
            static::$sharedTenantClass = null;
        }
    }

    protected function tearDown(): void
    {
        // Don't delete tenant after each test - reuse it.
        // Tenant cleanup happens when test class changes or in tearDownAfterClass.
        if ($this->tenancy) {
            // Just end tenancy, don't delete
            tenancy()->end();
            DB::purge('tenant');
        }
        
        parent::tearDown();
    }

    /**
     * Cleanup tenant after all tests in the class have run.
     */
    public static function tearDownAfterClass(): void
    {
        // Cleanup shared tenant when test class finishes
        if (static::$sharedTenant !== null) {
            try {
                static::$sharedTenant->delete();
                app(SQLiteDatabaseManager::class)->deleteDatabase(static::$sharedTenant);
            } catch (\Exception $e) {
                // Ignore cleanup errors during shutdown
            }
            static::$sharedTenant = null;
            static::$sharedTenantClass = null;
        }
        
        parent::tearDownAfterClass();
    }
}
