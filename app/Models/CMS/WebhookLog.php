<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $event_type
 * @property string $endpoint_url
 * @property string|null $endpoint_name
 * @property string $status
 * @property int|null $http_status
 * @property string $request_payload
 * @property string|null $response_body
 * @property string|null $error_message
 * @property int $attempt_number
 * @property int|null $duration_ms
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class WebhookLog extends Model
{
    protected $table = 'webhook_logs';

    protected $fillable = [
        'event_type',
        'endpoint_url',
        'endpoint_name',
        'status',
        'http_status',
        'request_payload',
        'response_body',
        'error_message',
        'attempt_number',
        'duration_ms',
    ];

    protected $casts = [
        'http_status' => 'integer',
        'attempt_number' => 'integer',
        'duration_ms' => 'integer',
    ];

    /**
     * Status constants.
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAILED = 'failed';

    /**
     * Scope to get recent logs.
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope to filter by status.
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to filter by event type.
     */
    public function scopeForEvent($query, string $eventType)
    {
        return $query->where('event_type', $eventType);
    }

    /**
     * Get success rate for recent webhooks.
     */
    public static function getSuccessRate(int $days = 7): float
    {
        $query = static::recent($days);
        $total = $query->count();

        if ($total === 0) {
            return 100.0;
        }

        $successful = static::recent($days)->withStatus(self::STATUS_SUCCESS)->count();

        return round(($successful / $total) * 100, 2);
    }
}
