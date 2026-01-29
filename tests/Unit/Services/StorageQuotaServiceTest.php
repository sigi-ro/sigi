<?php

namespace Tests\Unit\Services;

use App\Models\Tenant;
use App\Services\StorageQuotaService;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use League\Flysystem\Filesystem;
use Mockery;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for StorageQuotaService with mocked dependencies
 * @group unit
 * @group storage
 */
class StorageQuotaServiceTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function it_returns_empty_stats_when_no_tenant()
    {
        // Arrange - Mock the tenant() helper to return null
        $service = new StorageQuotaService('file_manager');

        // Act
        $stats = $service->getStorageStats(null);

        // Assert
        $this->assertEquals(0, $stats['used_bytes']);
        $this->assertEquals(0, $stats['limit_bytes']);
        $this->assertEquals(0, $stats['remaining_bytes']);
        $this->assertEquals(0, $stats['usage_percent']);
        $this->assertFalse($stats['is_quota_exceeded']);
        $this->assertEquals('0 B', $stats['used_formatted']);
    }

    /** @test */
    public function it_calculates_storage_stats_correctly()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('getAttribute')->with('storage_used_bytes')->andReturn(524288000); // 500 MB
        $tenant->shouldReceive('getAttribute')->with('storage_limit_bytes')->andReturn(1073741824); // 1 GB
        $tenant->shouldReceive('getAttribute')->with('storage_remaining_bytes')->andReturn(549453824);
        $tenant->shouldReceive('getAttribute')->with('storage_usage_percent')->andReturn(48.83);
        $tenant->shouldReceive('isStorageQuotaExceeded')->andReturn(false);

        $service = new StorageQuotaService('file_manager');

        // Act
        $stats = $service->getStorageStats($tenant);

        // Assert
        $this->assertEquals(524288000, $stats['used_bytes']);
        $this->assertEquals(1073741824, $stats['limit_bytes']);
        $this->assertEquals(549453824, $stats['remaining_bytes']);
        $this->assertEquals(48.83, $stats['usage_percent']);
        $this->assertFalse($stats['is_quota_exceeded']);
        $this->assertEquals('500 MB', $stats['used_formatted']);
        $this->assertEquals('1 GB', $stats['limit_formatted']);
    }

    /** @test */
    public function it_detects_quota_exceeded()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('getAttribute')->with('storage_used_bytes')->andReturn(1073741824); // 1 GB
        $tenant->shouldReceive('getAttribute')->with('storage_limit_bytes')->andReturn(1073741824); // 1 GB
        $tenant->shouldReceive('getAttribute')->with('storage_remaining_bytes')->andReturn(0);
        $tenant->shouldReceive('getAttribute')->with('storage_usage_percent')->andReturn(100);
        $tenant->shouldReceive('isStorageQuotaExceeded')->andReturn(true);

        $service = new StorageQuotaService('file_manager');

        // Act
        $stats = $service->getStorageStats($tenant);

        // Assert
        $this->assertTrue($stats['is_quota_exceeded']);
        $this->assertEquals(100, $stats['usage_percent']);
        $this->assertEquals(0, $stats['remaining_bytes']);
    }

    /** @test */
    public function it_checks_upload_allowed_when_within_quota()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('wouldExceedQuota')
            ->with(1048576) // 1 MB
            ->andReturn(false);

        $service = new StorageQuotaService('file_manager');

        // Act
        $canUpload = $service->canUpload(1048576, $tenant);

        // Assert
        $this->assertTrue($canUpload);
    }

    /** @test */
    public function it_blocks_upload_when_would_exceed_quota()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('wouldExceedQuota')
            ->with(1073741824) // 1 GB
            ->andReturn(true);

        $service = new StorageQuotaService('file_manager');

        // Act
        $canUpload = $service->canUpload(1073741824, $tenant);

        // Assert
        $this->assertFalse($canUpload);
    }

    /** @test */
    public function it_records_upload_and_increments_usage()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('incrementStorageUsage')
            ->with(1048576)
            ->once()
            ->andReturn(true);

        $service = new StorageQuotaService('file_manager');

        // Act
        $result = $service->recordUpload(1048576, $tenant);

        // Assert
        $this->assertTrue($result);
    }

    /** @test */
    public function it_records_deletion_and_decrements_usage()
    {
        // Arrange
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('decrementStorageUsage')
            ->with(1048576)
            ->once()
            ->andReturn(true);

        $service = new StorageQuotaService('file_manager');

        // Act
        $result = $service->recordDeletion(1048576, $tenant);

        // Assert
        $this->assertTrue($result);
    }

    /** @test */
    public function it_returns_false_for_upload_without_tenant()
    {
        $service = new StorageQuotaService('file_manager');

        $this->assertFalse($service->canUpload(1024, null));
        $this->assertFalse($service->recordUpload(1024, null));
        $this->assertFalse($service->recordDeletion(1024, null));
    }

    /** @test */
    public function it_sets_storage_limit_on_tenant()
    {
        // Arrange
        $newLimit = 2147483648; // 2 GB
        $tenant = Mockery::mock(Tenant::class);
        $tenant->shouldReceive('setAttribute')
            ->with('storage_limit_bytes', $newLimit)
            ->once();
        $tenant->shouldReceive('save')
            ->once()
            ->andReturn(true);

        $service = new StorageQuotaService('file_manager');

        // Act
        $result = $service->setStorageLimit($newLimit, $tenant);

        // Assert
        $this->assertTrue($result);
    }

    /** @test */
    public function it_formats_bytes_correctly()
    {
        $service = new StorageQuotaService('file_manager');

        $this->assertEquals('0 B', $service->formatBytes(0));
        $this->assertEquals('1 KB', $service->formatBytes(1024));
        $this->assertEquals('1 MB', $service->formatBytes(1048576));
        $this->assertEquals('1 GB', $service->formatBytes(1073741824));
        $this->assertEquals('1.5 GB', $service->formatBytes(1610612736));
        $this->assertEquals('500 MB', $service->formatBytes(524288000));
    }

    /** @test */
    public function it_parses_bytes_from_human_readable()
    {
        $service = new StorageQuotaService('file_manager');

        $this->assertEquals(1024, $service->parseBytes('1K'));
        $this->assertEquals(1048576, $service->parseBytes('1M'));
        $this->assertEquals(1073741824, $service->parseBytes('1G'));
        $this->assertEquals(512, $service->parseBytes('512'));
    }
}
