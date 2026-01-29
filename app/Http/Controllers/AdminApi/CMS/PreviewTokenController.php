<?php

namespace App\Http\Controllers\AdminApi\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\Page;
use Illuminate\Http\JsonResponse;

class PreviewTokenController extends Controller
{
    /**
     * Generate a preview token for a page.
     *
     * POST /admin-api/cms/pages/{page}/preview-token
     */
    public function store(Page $page): JsonResponse
    {
        $page->generatePreviewToken();

        return response()->json([
            'success' => true,
            'preview_url' => $page->getPreviewUrl(),
            'expires_at' => $page->preview_token_expires_at->toIso8601String(),
            'expires_in_minutes' => Page::PREVIEW_TOKEN_EXPIRY_MINUTES,
        ]);
    }

    /**
     * Revoke a preview token for a page.
     *
     * DELETE /admin-api/cms/pages/{page}/preview-token
     */
    public function destroy(Page $page): JsonResponse
    {
        $page->clearPreviewToken();

        return response()->json([
            'success' => true,
            'message' => 'Preview token revoked successfully.',
        ]);
    }

    /**
     * Get preview token status for a page.
     *
     * GET /admin-api/cms/pages/{page}/preview-token
     */
    public function show(Page $page): JsonResponse
    {
        $hasToken = $page->hasValidPreviewToken();

        return response()->json([
            'has_valid_token' => $hasToken,
            'preview_url' => $hasToken ? $page->getPreviewUrl() : null,
            'expires_at' => $hasToken ? $page->preview_token_expires_at->toIso8601String() : null,
        ]);
    }
}
