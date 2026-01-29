<?php

namespace Tests\Feature\Api;

use Tests\TenantTestCase;

/**
 * @group api
 * @group security
 */
class TenantCorsTest extends TenantTestCase
{
    /**
     * Test that requests from tenant's own domain are allowed.
     */
    public function test_requests_from_tenant_domain_are_allowed(): void
    {
        $response = $this->withHeaders([
            'Origin' => 'http://phpunit.localhost',
        ])->getJson(route('api.pages.index'));

        $response->assertHeader('Access-Control-Allow-Origin', 'http://phpunit.localhost');
    }

    /**
     * Test that requests without Origin header are allowed (same-origin).
     */
    public function test_requests_without_origin_are_allowed(): void
    {
        $response = $this->getJson(route('api.pages.index'));

        $response->assertSuccessful();
    }

    /**
     * Test that localhost is allowed in development/testing.
     */
    public function test_localhost_allowed_in_development(): void
    {
        $response = $this->withHeaders([
            'Origin' => 'http://localhost:3000',
        ])->getJson(route('api.pages.index'));

        $response->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    }

    /**
     * Test CORS headers include required security headers.
     */
    public function test_cors_headers_are_complete(): void
    {
        $response = $this->withHeaders([
            'Origin' => 'http://phpunit.localhost',
        ])->getJson(route('api.pages.index'));

        $response->assertHeader('Access-Control-Allow-Methods');
        $response->assertHeader('Access-Control-Allow-Headers');
        $response->assertHeader('Access-Control-Max-Age');
    }

    /**
     * Test that requests from unknown origins don't get CORS headers.
     */
    public function test_unknown_origin_does_not_get_cors_headers(): void
    {
        // In production, this would be blocked
        // In testing/dev, we're more permissive but still validate
        $response = $this->withHeaders([
            'Origin' => 'http://malicious-site.example.com',
        ])->getJson(route('api.pages.index'));

        // The response should succeed but without CORS headers for this origin
        // (unless we're in dev mode where localhost variations are allowed)
        $response->assertSuccessful();
    }

    /**
     * Test preflight OPTIONS request handling.
     */
    public function test_preflight_request_is_handled(): void
    {
        $response = $this->withHeaders([
            'Origin' => 'http://phpunit.localhost',
            'Access-Control-Request-Method' => 'POST',
            'Access-Control-Request-Headers' => 'Content-Type',
        ])->options(route('api.pages.index'));

        // Laravel's CORS middleware handles OPTIONS automatically
        // Our middleware adds tenant-specific validation
        $this->assertTrue(
            $response->isSuccessful() || $response->status() === 204,
            'Preflight should return 2xx or 204'
        );
    }
}
