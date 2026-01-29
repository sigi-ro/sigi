<?php

namespace App\Http\Controllers\Api\CMS;

use App\Http\Controllers\Controller;
use App\Http\Resources\Web\CMS\FullPageResource;
use App\Models\CMS\Page;
use Illuminate\Http\JsonResponse;

class PreviewController extends Controller
{
    /**
     * Get a page preview by token.
     * 
     * This endpoint is public and does not require authentication.
     * It validates the preview token and returns the full page data
     * regardless of publication status.
     */
    public function show(string $token): FullPageResource|JsonResponse
    {
        $page = Page::findByPreviewToken($token);

        if (!$page) {
            return response()->json([
                'message' => 'Preview not found or expired',
            ], 404);
        }

        // Load all relationships needed for preview
        $page->load([
            'content',
            'content.templateField',
            'layout',
            'layout.content',
            'layout.content.templateField',
            'metadata',
            'template',
            'template.templateFields',
            'url',
        ]);

        return FullPageResource::make($page);
    }

    /**
     * Generate a preview token for a page.
     * 
     * This endpoint requires authentication and CMS edit permissions.
     */
    public function store(Page $page): JsonResponse
    {
        $token = $page->generatePreviewToken();

        return response()->json([
            'token' => $token,
            'preview_url' => route('api.preview.show', ['token' => $token]),
            'expires_at' => $page->preview_token_expires_at->toIso8601String(),
            'expires_in_minutes' => Page::PREVIEW_TOKEN_EXPIRY_MINUTES,
        ]);
    }

    /**
     * Revoke/clear the preview token for a page.
     */
    public function destroy(Page $page): JsonResponse
    {
        $page->clearPreviewToken();

        return response()->json([
            'message' => 'Preview token revoked',
        ]);
    }
}
