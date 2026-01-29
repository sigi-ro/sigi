<?php

namespace Tests\Feature\Api;

use Tests\TenantTestCase;

/**
 * @group api
 * @group security
 */
class RateLimitingTest extends TenantTestCase
{
    /**
     * Test that form submission has strict rate limiting.
     *
     * @return void
     */
    public function test_form_submission_is_rate_limited(): void
    {
        // Create a form for testing
        $form = \App\Models\CRM\Form::factory()->create([
            'slug' => 'test-form',
            'is_active' => true,
        ]);

        // Make 5 requests (the limit per minute)
        for ($i = 0; $i < 5; $i++) {
            $response = $this->postJson(route('api.form-submission.store', ['slug' => 'test-form']), [
                'name' => 'Test User ' . $i,
                'email' => "test{$i}@example.com",
            ]);
            
            // These should succeed (or fail for other reasons, but not rate limiting)
            $this->assertNotEquals(429, $response->getStatusCode(), "Request $i should not be rate limited");
        }

        // The 6th request should be rate limited
        $response = $this->postJson(route('api.form-submission.store', ['slug' => 'test-form']), [
            'name' => 'Test User 6',
            'email' => 'test6@example.com',
        ]);

        $response->assertStatus(429);
        $response->assertHeader('Retry-After');
    }

    /**
     * Test that public API endpoints allow higher throughput.
     *
     * @return void
     */
    public function test_public_api_allows_higher_throughput(): void
    {
        // Make 60 requests to the pages endpoint
        for ($i = 0; $i < 60; $i++) {
            $response = $this->getJson(route('api.pages.index'));
            
            // Should not be rate limited within first 60 requests
            $this->assertNotEquals(429, $response->getStatusCode(), "Request $i should not be rate limited");
        }
    }

    /**
     * Test that rate limit headers are present in responses.
     *
     * @return void
     */
    public function test_rate_limit_headers_are_present(): void
    {
        $response = $this->getJson(route('api.pages.index'));

        // Check for rate limit headers
        $response->assertHeader('X-RateLimit-Limit');
        $response->assertHeader('X-RateLimit-Remaining');
    }

    /**
     * Test that theme endpoint is rate limited.
     *
     * @return void
     */
    public function test_theme_endpoint_is_rate_limited(): void
    {
        $response = $this->getJson(route('api.theme.show'));

        // Should have rate limit headers
        $response->assertHeader('X-RateLimit-Limit');
        
        // Verify it's using the api-public rate limiter (120/min)
        $this->assertEquals(120, $response->headers->get('X-RateLimit-Limit'));
    }
}
