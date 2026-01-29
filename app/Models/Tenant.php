<?php

namespace App\Models;

use App\Models\Settings\CoreSettings;
use Exception;
use Illuminate\Support\Str;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

/**
 *
 * @property string $id
 * @property string $locale
 * @property array $modules
 * @property int $storage_used_bytes
 * @property int $storage_limit_bytes
 */
class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $casts = [
        'modules' => 'array',
        'storage_used_bytes' => 'integer',
        'storage_limit_bytes' => 'integer',
    ];

    /**
     * Default storage limit: 1GB in bytes
     */
    public const DEFAULT_STORAGE_LIMIT = 1073741824;

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'modules',
            'storage_used_bytes',
            'storage_limit_bytes',
        ];
    }


    public function getLocaleAttribute(): string
    {
        try {
            return app()->make(CoreSettings::class)->locale;
        } catch (Exception $e) {
            // For when a tenant is being created
            return 'en';
        }
    }

    public function hasModule(string $module): bool
    {
        return $this->modules && in_array(Str::upper($module), $this->modules);
    }

    /**
     * Get storage usage as a percentage (0-100)
     */
    public function getStorageUsagePercentAttribute(): float
    {
        if ($this->storage_limit_bytes <= 0) {
            return 0;
        }

        return round(($this->storage_used_bytes / $this->storage_limit_bytes) * 100, 2);
    }

    /**
     * Get remaining storage in bytes
     */
    public function getStorageRemainingBytesAttribute(): int
    {
        return max(0, $this->storage_limit_bytes - $this->storage_used_bytes);
    }

    /**
     * Check if storage quota is exceeded
     */
    public function isStorageQuotaExceeded(): bool
    {
        return $this->storage_used_bytes >= $this->storage_limit_bytes;
    }

    /**
     * Check if adding bytes would exceed quota
     */
    public function wouldExceedQuota(int $bytes): bool
    {
        return ($this->storage_used_bytes + $bytes) > $this->storage_limit_bytes;
    }

    /**
     * Increment storage usage
     */
    public function incrementStorageUsage(int $bytes): bool
    {
        $this->storage_used_bytes = $this->storage_used_bytes + $bytes;
        return $this->save();
    }

    /**
     * Decrement storage usage
     */
    public function decrementStorageUsage(int $bytes): bool
    {
        $this->storage_used_bytes = max(0, $this->storage_used_bytes - $bytes);
        return $this->save();
    }
}
