<?php

namespace Tests\Unit\CMS;

use App\Models\CMS\Page;
use Carbon\Carbon;
use Illuminate\Support\Str;
use PHPUnit\Framework\TestCase;

/**
 * @group preview
 * @group cms
 * 
 * Unit tests for Preview Mode functionality.
 * These test the Page model's preview token methods directly
 * without requiring database persistence.
 */
class PreviewTokenTest extends TestCase
{
    /** @test */
    public function page_validates_preview_token_logic(): void
    {
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        // No token set
        $this->assertFalse($page->hasValidPreviewToken());

        // Manually set token and expiry (simulating what generatePreviewToken would do)
        $page->preview_token = Str::random(64);
        $page->preview_token_expires_at = Carbon::now()->addHour();
        
        $this->assertTrue($page->hasValidPreviewToken());
    }

    /** @test */
    public function page_detects_expired_token(): void
    {
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        // Set valid token
        $page->preview_token = Str::random(64);
        $page->preview_token_expires_at = Carbon::now()->addHour();
        
        $this->assertTrue($page->hasValidPreviewToken());

        // Manually expire the token
        $page->preview_token_expires_at = Carbon::now()->subHour();

        $this->assertFalse($page->hasValidPreviewToken());
    }

    /** @test */
    public function page_validates_specific_token(): void
    {
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        $correctToken = Str::random(64);
        $page->preview_token = $correctToken;
        $page->preview_token_expires_at = Carbon::now()->addHour();

        // Valid token
        $this->assertTrue($page->isPreviewTokenValid($correctToken));

        // Invalid token
        $this->assertFalse($page->isPreviewTokenValid('wrong-token'));

        // Expired token (should fail even with correct token)
        $page->preview_token_expires_at = Carbon::now()->subHour();
        $this->assertFalse($page->isPreviewTokenValid($correctToken));
    }

    /** @test */
    public function page_clears_preview_token(): void
    {
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        // Set token
        $page->preview_token = Str::random(64);
        $page->preview_token_expires_at = Carbon::now()->addHour();
        
        $this->assertTrue($page->hasValidPreviewToken());

        // Clear it (don't call save, just set attributes)
        $page->preview_token = null;
        $page->preview_token_expires_at = null;
        
        $this->assertFalse($page->hasValidPreviewToken());
        $this->assertNull($page->preview_token);
        $this->assertNull($page->preview_token_expires_at);
    }

    /** @test */
    public function preview_url_is_generated_correctly(): void
    {
        // Mock config
        config(['app.url' => 'http://test.localhost']);
        
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        $token = Str::random(64);
        $page->preview_token = $token;
        $page->preview_token_expires_at = Carbon::now()->addHour();
        
        $previewUrl = $page->getPreviewUrl();

        $this->assertStringContainsString('/api/preview/', $previewUrl);
        $this->assertStringContainsString($token, $previewUrl);
    }

    /** @test */
    public function preview_url_returns_null_without_token(): void
    {
        $page = new Page([
            'name' => 'Test Page',
            'slug' => 'test-page-' . Str::random(8),
        ]);

        // No token set
        $previewUrl = $page->getPreviewUrl();
        $this->assertNull($previewUrl);
    }

    /** @test */
    public function preview_token_expiry_constant_is_defined(): void
    {
        $this->assertEquals(60, Page::PREVIEW_TOKEN_EXPIRY_MINUTES);
    }

    /** @test */
    public function page_fillable_includes_preview_fields(): void
    {
        $page = new Page();
        $fillable = $page->getFillable();

        $this->assertContains('preview_token', $fillable);
        $this->assertContains('preview_token_expires_at', $fillable);
    }
}
