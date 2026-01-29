<?php

namespace App\Models\CMS;

use App\Traits\CMS\HasContent;
use App\Traits\CMS\HasMetadata;
use App\Traits\CMS\HasUrl;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $layout_id
 * @property Layout $layout
 * @property int $template_id
 * @property Template $template
 * @property int $parent_id
 * @property Page $parent
 * @property string $name
 * @property string $slug
 * @property string|null $preview_token
 * @property Carbon|null $preview_token_expires_at
 * @property Collection<PageView> $pageViews
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Page extends Model
{
    use HasContent, HasFactory, HasMetadata, HasUrl;

    protected $table = 'cms_pages';

    protected $guarded = [];

    protected $casts = [
        'preview_token_expires_at' => 'datetime',
    ];

    /**
     * Preview token expiry duration in minutes.
     */
    public const PREVIEW_TOKEN_EXPIRY_MINUTES = 60;

    public function layout(): BelongsTo
    {
        return $this->belongsTo(Layout::class);
    }

    public function pageViews(): HasMany
    {
        return $this->hasMany(PageView::class, 'page_id');
    }

    public function parent() : BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function template() : BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Generate a new preview token for this page.
     * 
     * @param int|null $expiryMinutes Minutes until token expires (default: 60)
     * @return string The generated token
     */
    public function generatePreviewToken(?int $expiryMinutes = null): string
    {
        $expiryMinutes = $expiryMinutes ?? self::PREVIEW_TOKEN_EXPIRY_MINUTES;
        
        $token = Str::random(64);
        
        $this->update([
            'preview_token' => $token,
            'preview_token_expires_at' => Carbon::now()->addMinutes($expiryMinutes),
        ]);

        return $token;
    }

    /**
     * Check if the current preview token is valid.
     * 
     * @return bool
     */
    public function hasValidPreviewToken(): bool
    {
        if (empty($this->preview_token)) {
            return false;
        }

        if (empty($this->preview_token_expires_at)) {
            return false;
        }

        return $this->preview_token_expires_at->isFuture();
    }

    /**
     * Validate a given token against this page's preview token.
     * 
     * @param string $token
     * @return bool
     */
    public function isPreviewTokenValid(string $token): bool
    {
        if (empty($this->preview_token) || empty($token)) {
            return false;
        }

        if (!hash_equals($this->preview_token, $token)) {
            return false;
        }

        return $this->hasValidPreviewToken();
    }

    /**
     * Clear the preview token.
     * 
     * @return void
     */
    public function clearPreviewToken(): void
    {
        $this->update([
            'preview_token' => null,
            'preview_token_expires_at' => null,
        ]);
    }

    /**
     * Get the preview URL for this page.
     * 
     * @return string|null
     */
    public function getPreviewUrl(): ?string
    {
        if (!$this->hasValidPreviewToken()) {
            return null;
        }

        return route('preview.show', ['token' => $this->preview_token]);
    }

    /**
     * Find a page by its preview token.
     * 
     * @param string $token
     * @return Page|null
     */
    public static function findByPreviewToken(string $token): ?Page
    {
        return static::where('preview_token', $token)
            ->where('preview_token_expires_at', '>', Carbon::now())
            ->first();
    }
}
