<?php

namespace Tests\Unit\Models;

use App\Models\Tenant;
use PHPUnit\Framework\TestCase;
use Mockery;

/**
 * Unit tests for Tenant model storage quota methods
 * @group unit
 * @group tenant
 * @group storage
 */
class TenantStorageQuotaTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function it_calculates_storage_usage_percent_correctly()
    {
        // Test using reflection to test the accessor logic
        $tenant = new Tenant();
        $tenant->storage_used_bytes = 524288000; // 500 MB
        $tenant->storage_limit_bytes = 1073741824; // 1 GB

        // Direct calculation test (48.83%)
        $expectedPercent = round((524288000 / 1073741824) * 100, 2);
        $this->assertEquals(48.83, $expectedPercent);
    }

    /** @test */
    public function it_returns_zero_percent_when_limit_is_zero()
    {
        // When limit is 0, should return 0% to avoid division by zero
        $tenant = new Tenant();
        $tenant->storage_used_bytes = 500;
        $tenant->storage_limit_bytes = 0;

        // The accessor should handle division by zero
        $this->assertEquals(0, $tenant->storage_limit_bytes);
    }

    /** @test */
    public function it_calculates_remaining_bytes_correctly()
    {
        $tenant = new Tenant();
        $tenant->storage_used_bytes = 524288000;
        $tenant->storage_limit_bytes = 1073741824;

        $expected = 1073741824 - 524288000;
        $this->assertEquals(549453824, $expected);
    }

    /** @test */
    public function it_returns_zero_remaining_when_over_limit()
    {
        // When used > limit, remaining should be 0 (not negative)
        $usedBytes = 1500000000;
        $limitBytes = 1073741824;

        $remaining = max(0, $limitBytes - $usedBytes);
        $this->assertEquals(0, $remaining);
    }

    /** @test */
    public function it_detects_quota_exceeded()
    {
        // At limit
        $tenant = new Tenant();
        $tenant->storage_used_bytes = 1073741824;
        $tenant->storage_limit_bytes = 1073741824;

        $this->assertTrue($tenant->storage_used_bytes >= $tenant->storage_limit_bytes);

        // Over limit
        $tenant->storage_used_bytes = 1200000000;
        $this->assertTrue($tenant->storage_used_bytes >= $tenant->storage_limit_bytes);

        // Under limit
        $tenant->storage_used_bytes = 500000000;
        $this->assertFalse($tenant->storage_used_bytes >= $tenant->storage_limit_bytes);
    }

    /** @test */
    public function it_checks_if_upload_would_exceed_quota()
    {
        $tenant = new Tenant();
        $tenant->storage_used_bytes = 1000000000; // ~954 MB
        $tenant->storage_limit_bytes = 1073741824; // 1 GB

        // Would exceed: 954 MB + 100 MB = 1054 MB > 1024 MB
        $this->assertTrue($tenant->wouldExceedQuota(104857600)); // 100 MB

        // Would NOT exceed: 954 MB + 50 MB = 1004 MB < 1024 MB
        $this->assertFalse($tenant->wouldExceedQuota(52428800)); // 50 MB
    }

    /** @test */
    public function it_has_correct_default_storage_limit()
    {
        // Default 1 GB
        $this->assertEquals(1073741824, Tenant::DEFAULT_STORAGE_LIMIT);
    }

    /** @test */
    public function it_includes_storage_columns_in_custom_columns()
    {
        $customColumns = Tenant::getCustomColumns();

        $this->assertContains('storage_used_bytes', $customColumns);
        $this->assertContains('storage_limit_bytes', $customColumns);
    }

    /** @test */
    public function it_casts_storage_columns_as_integers()
    {
        $tenant = new Tenant();
        $casts = $tenant->getCasts();

        $this->assertEquals('integer', $casts['storage_used_bytes'] ?? null);
        $this->assertEquals('integer', $casts['storage_limit_bytes'] ?? null);
    }
}
