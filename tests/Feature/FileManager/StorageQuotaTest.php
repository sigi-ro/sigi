<?php

namespace Tests\Feature\FileManager;

use App\Models\Tenant;
use App\Models\User;
use App\Services\StorageQuotaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Spatie\Permission\Models\Permission;
use Tests\TenantTestCase;

/**
 * Feature tests for Storage Quota API with mocked service
 * @group feature
 * @group storage
 * @group api
 */
class StorageQuotaTest extends TenantTestCase
{
    use RefreshDatabase;

    protected function createPermissions(): void
    {
        Permission::firstOrCreate(['name' => 'view file_manager']);
        Permission::firstOrCreate(['name' => 'edit file_manager']);
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }

    protected function createUserWithPermission(): User
    {
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);
        return $user;
    }

    /** @test */
    public function it_returns_storage_quota_stats_for_authenticated_user()
    {
        // Arrange
        $user = $this->createUserWithPermission();

        $mockStats = [
            'used_bytes' => 524288000,
            'limit_bytes' => 1073741824,
            'remaining_bytes' => 549453824,
            'usage_percent' => 48.83,
            'is_quota_exceeded' => false,
            'used_formatted' => '500 MB',
            'limit_formatted' => '1 GB',
            'remaining_formatted' => '524 MB',
        ];

        $mockService = Mockery::mock(StorageQuotaService::class);
        $mockService->shouldReceive('getStorageStats')
            ->once()
            ->andReturn($mockStats);

        $this->app->instance(StorageQuotaService::class, $mockService);

        // Act
        $response = $this->signIn($user)
            ->getJson(route('admin.api.file-manager.storage-quota.index'));

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'data' => $mockStats
            ]);
    }

    /** @test */
    public function it_requires_authentication_for_storage_quota()
    {
        // Act
        $response = $this->getJson(route('admin.api.file-manager.storage-quota.index'));

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_requires_view_file_manager_permission()
    {
        // Arrange
        $user = User::factory()->create();
        // User without file_manager permission

        // Act
        $response = $this->signIn($user)
            ->getJson(route('admin.api.file-manager.storage-quota.index'));

        // Assert
        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_recalculate_storage_usage()
    {
        // Arrange
        $user = $this->createUserWithPermission();

        $mockStats = [
            'used_bytes' => 750000000,
            'limit_bytes' => 1073741824,
            'remaining_bytes' => 323741824,
            'usage_percent' => 69.85,
            'is_quota_exceeded' => false,
            'used_formatted' => '715 MB',
            'limit_formatted' => '1 GB',
            'remaining_formatted' => '309 MB',
        ];

        $mockService = Mockery::mock(StorageQuotaService::class);
        $mockService->shouldReceive('recalculateStorageUsage')
            ->once()
            ->andReturn(750000000);
        $mockService->shouldReceive('getStorageStats')
            ->once()
            ->andReturn($mockStats);

        $this->app->instance(StorageQuotaService::class, $mockService);

        // Act
        $response = $this->signIn($user)
            ->postJson(route('admin.api.file-manager.storage-quota.recalculate'));

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'data' => $mockStats,
                'message' => 'Storage usage recalculated successfully.'
            ]);
    }

    /** @test */
    public function it_shows_quota_exceeded_status()
    {
        // Arrange
        $user = $this->createUserWithPermission();

        $mockStats = [
            'used_bytes' => 1073741824,
            'limit_bytes' => 1073741824,
            'remaining_bytes' => 0,
            'usage_percent' => 100,
            'is_quota_exceeded' => true,
            'used_formatted' => '1 GB',
            'limit_formatted' => '1 GB',
            'remaining_formatted' => '0 B',
        ];

        $mockService = Mockery::mock(StorageQuotaService::class);
        $mockService->shouldReceive('getStorageStats')
            ->once()
            ->andReturn($mockStats);

        $this->app->instance(StorageQuotaService::class, $mockService);

        // Act
        $response = $this->signIn($user)
            ->getJson(route('admin.api.file-manager.storage-quota.index'));

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('data.is_quota_exceeded', true)
            ->assertJsonPath('data.usage_percent', 100);
    }
}
