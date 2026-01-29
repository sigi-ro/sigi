<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Tenant-aware CORS middleware.
 *
 * This middleware restricts API access based on tenant configuration.
 * Each tenant can configure allowed origins for their API endpoints.
 *
 * Security: Prevents cross-tenant API access by validating Origin header
 * against tenant-specific allowed origins.
 */
class TenantCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only process if we have a tenant context
        if (!function_exists('tenant') || !tenant()) {
            return $response;
        }

        $origin = $request->headers->get('Origin');
        
        // No Origin header = same-origin request, allow it
        if (!$origin) {
            return $response;
        }

        $allowedOrigins = $this->getAllowedOrigins();
        
        // Check if origin is allowed
        if ($this->isOriginAllowed($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
            $response->headers->set('Access-Control-Max-Age', '86400'); // 24 hours
            
            // Allow credentials if configured
            if ($this->shouldAllowCredentials()) {
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
            }
        } else {
            // Origin not allowed - remove any CORS headers that might have been set
            $response->headers->remove('Access-Control-Allow-Origin');
            
            // For preflight requests, return 403
            if ($request->isMethod('OPTIONS')) {
                return response('', 403);
            }
        }

        return $response;
    }

    /**
     * Get allowed origins for the current tenant.
     *
     * Returns an array of allowed origin patterns.
     * Patterns can include wildcards: *.example.com
     *
     * @return array
     */
    protected function getAllowedOrigins(): array
    {
        $origins = [];
        
        // Always allow the tenant's own domain
        $tenant = tenant();
        if ($tenant) {
            $domains = $tenant->domains()->pluck('domain')->toArray();
            foreach ($domains as $domain) {
                // Allow both http and https for the tenant domain
                $origins[] = 'http://' . $domain;
                $origins[] = 'https://' . $domain;
                $origins[] = 'http://' . $domain . '.localhost';
                $origins[] = 'https://' . $domain . '.localhost';
            }
        }
        
        // Add configured allowed origins from tenant settings
        // This could come from a TenantSettings model or config
        $configuredOrigins = $this->getConfiguredOrigins();
        $origins = array_merge($origins, $configuredOrigins);
        
        // In development, allow localhost variations
        if (app()->environment('local', 'development', 'testing')) {
            $origins[] = 'http://localhost:3000';  // Next.js dev
            $origins[] = 'http://localhost:3001';
            $origins[] = 'http://127.0.0.1:3000';
            $origins[] = 'http://127.0.0.1:3001';
        }
        
        return array_unique($origins);
    }

    /**
     * Get configured origins from tenant settings.
     *
     * @return array
     */
    protected function getConfiguredOrigins(): array
    {
        // Check if tenant has CorsSettings
        // This can be extended to use spatie/laravel-settings
        try {
            // Future: return app(\App\Models\Settings\CorsSettings::class)->allowed_origins ?? [];
            return config('cors.tenant_allowed_origins', []);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Check if the given origin is allowed.
     *
     * Supports exact matches and wildcard patterns (*.example.com).
     *
     * @param string $origin
     * @param array $allowedOrigins
     * @return bool
     */
    protected function isOriginAllowed(string $origin, array $allowedOrigins): bool
    {
        // Normalize origin
        $origin = rtrim(strtolower($origin), '/');
        
        foreach ($allowedOrigins as $allowed) {
            $allowed = rtrim(strtolower($allowed), '/');
            
            // Exact match
            if ($origin === $allowed) {
                return true;
            }
            
            // Wildcard pattern: *.example.com
            if (str_starts_with($allowed, '*.')) {
                $pattern = substr($allowed, 2); // Remove *.
                $parsedOrigin = parse_url($origin);
                $host = $parsedOrigin['host'] ?? '';
                
                // Check if host ends with the pattern
                if (str_ends_with($host, $pattern) || str_ends_with($host, '.' . $pattern)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Determine if credentials should be allowed.
     *
     * @return bool
     */
    protected function shouldAllowCredentials(): bool
    {
        return config('cors.supports_credentials', false);
    }
}
