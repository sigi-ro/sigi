<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    | SECURITY NOTE: The TenantCors middleware handles tenant-specific CORS.
    | The settings below are used as defaults and can be overridden per-tenant.
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | IMPORTANT: Setting to ['*'] is insecure in multi-tenant environments!
    | Use the TenantCors middleware for tenant-specific origin validation.
    |
    | For development: Leave as ['*'] but ensure TenantCors middleware runs.
    | For production: This should be empty; TenantCors handles validation.
    |
    */
    'allowed_origins' => env('APP_ENV') === 'production' ? [] : ['*'],

    /*
    |--------------------------------------------------------------------------
    | Tenant-Specific Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Additional origins that should be allowed for all tenants.
    | Tenant-specific origins are configured via tenant settings.
    |
    */
    'tenant_allowed_origins' => array_filter(explode(',', env('CORS_ALLOWED_ORIGINS', ''))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],

    'exposed_headers' => ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'Retry-After'],

    'max_age' => 86400, // 24 hours - reduces preflight requests

    'supports_credentials' => false,

];
