<?php

namespace App\Http\Controllers\AdminApi\FileManager;

use App\Http\Controllers\Controller;
use App\Interfaces\PermissionInterface;
use App\Services\StorageQuotaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StorageQuotaController extends Controller
{
    protected StorageQuotaService $storageQuotaService;

    public function __construct(StorageQuotaService $storageQuotaService)
    {
        $this->storageQuotaService = $storageQuotaService;

        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::VIEW_FILE_MANAGER)
        );
    }

    /**
     * Get current storage quota stats
     */
    public function index(): JsonResponse
    {
        $stats = $this->storageQuotaService->getStorageStats();

        return response()->json([
            'data' => $stats,
        ]);
    }

    /**
     * Recalculate storage usage from disk
     * Useful for syncing after manual file operations
     */
    public function recalculate(Request $request): JsonResponse
    {
        $newUsage = $this->storageQuotaService->recalculateStorageUsage();
        $stats = $this->storageQuotaService->getStorageStats();

        return response()->json([
            'data' => $stats,
            'message' => 'Storage usage recalculated successfully.',
        ]);
    }
}
