<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\StorageAttributes;

class StorageQuotaService
{
    /**
     * Default storage disk for file manager
     */
    protected string $storageDisk;

    public function __construct(?string $storageDisk = null)
    {
        $this->storageDisk = $storageDisk ?? 'file_manager';
    }

    /**
     * Get current storage stats for tenant
     */
    public function getStorageStats(?Tenant $tenant = null): array
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return [
                'used_bytes' => 0,
                'limit_bytes' => 0,
                'remaining_bytes' => 0,
                'usage_percent' => 0,
                'is_quota_exceeded' => false,
                'used_formatted' => '0 B',
                'limit_formatted' => '0 B',
                'remaining_formatted' => '0 B',
            ];
        }

        return [
            'used_bytes' => $tenant->storage_used_bytes,
            'limit_bytes' => $tenant->storage_limit_bytes,
            'remaining_bytes' => $tenant->storage_remaining_bytes,
            'usage_percent' => $tenant->storage_usage_percent,
            'is_quota_exceeded' => $tenant->isStorageQuotaExceeded(),
            'used_formatted' => $this->formatBytes($tenant->storage_used_bytes),
            'limit_formatted' => $this->formatBytes($tenant->storage_limit_bytes),
            'remaining_formatted' => $this->formatBytes($tenant->storage_remaining_bytes),
        ];
    }

    /**
     * Check if file upload would exceed quota
     */
    public function canUpload(int $fileSize, ?Tenant $tenant = null): bool
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return false;
        }

        return !$tenant->wouldExceedQuota($fileSize);
    }

    /**
     * Record file upload and update storage usage
     */
    public function recordUpload(int $fileSize, ?Tenant $tenant = null): bool
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return false;
        }

        return $tenant->incrementStorageUsage($fileSize);
    }

    /**
     * Record file deletion and update storage usage
     */
    public function recordDeletion(int $fileSize, ?Tenant $tenant = null): bool
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return false;
        }

        return $tenant->decrementStorageUsage($fileSize);
    }

    /**
     * Recalculate storage usage from disk
     * Useful for syncing after manual file operations
     */
    public function recalculateStorageUsage(?Tenant $tenant = null): int
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return 0;
        }

        $totalBytes = $this->calculateDiskUsage();

        $tenant->storage_used_bytes = $totalBytes;
        $tenant->save();

        return $totalBytes;
    }

    /**
     * Calculate total disk usage by iterating all files
     */
    public function calculateDiskUsage(): int
    {
        $totalBytes = 0;

        try {
            $files = Storage::disk($this->storageDisk)
                ->listContents('', true) // Recursive
                ->filter(fn(StorageAttributes $attributes) => $attributes->isFile());

            foreach ($files as $file) {
                $totalBytes += $file->fileSize() ?? 0;
            }
        } catch (\Exception $e) {
            // Log error but don't fail - disk might not exist yet
            report($e);
        }

        return $totalBytes;
    }

    /**
     * Set storage limit for tenant
     */
    public function setStorageLimit(int $limitBytes, ?Tenant $tenant = null): bool
    {
        $tenant = $tenant ?? tenant();

        if (!$tenant) {
            return false;
        }

        $tenant->storage_limit_bytes = $limitBytes;
        return $tenant->save();
    }

    /**
     * Format bytes to human readable string
     */
    public function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    /**
     * Parse human readable size to bytes
     */
    public function parseBytes(string $size): int
    {
        $size = trim($size);
        $last = strtoupper(substr($size, -1));
        $value = (int) $size;

        return match ($last) {
            'G' => $value * 1073741824,
            'M' => $value * 1048576,
            'K' => $value * 1024,
            default => $value,
        };
    }
}
