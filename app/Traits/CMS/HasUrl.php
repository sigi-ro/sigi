<?php

namespace App\Traits\CMS;

use App\Models\CMS\Url;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Builder;

trait HasUrl
{

    public function url() : MorphOne
    {
        return $this->morphOne(Url::class, 'urlable');
    }

    public function scopeWithoutSelfOrChildUrls(Builder $query, string $url_full) : Builder
    {
        if (!$url_full || $url_full === '/') {
            return $query;
        }

        return $query->whereHas(
            'url',
            function ($q) use ($url_full) {
                $q->where('url_full', '<>', $url_full)
                    ->where('url_full', 'NOT LIKE', $url_full . '/%');
            }
        );
    }

    public function scopeWithoutHomeUrl(Builder $query) : Builder
    {
        return $query->whereHas(
            'url',
            function ($q) {
                $q->where('url_full', '<>', '/');
            }
        );
    }

    public function scopeWithOrderedUrl(Builder $query, String $order_direction = 'asc') : Builder
    {
        $ordered_ids = Url::where('urlable_type', '=', self::class)
            ->orderBy('url_full',  $order_direction)
            ->pluck('urlable_id')
            ->toArray();

        if (empty($ordered_ids)) {
            return $query->whereHas('url')->with('url');
        }

        // Use database-agnostic ordering
        $connection = $query->getConnection()->getDriverName();
        if ($connection === 'sqlite') {
            // SQLite doesn't support FIELD(), use CASE instead
            $cases = collect($ordered_ids)->map(function ($id, $index) {
                return "WHEN {$id} THEN {$index}";
            })->implode(' ');
            
            return $query->whereHas('url')
                ->with('url')
                ->orderByRaw("CASE id {$cases} END");
        } else {
            // MySQL/MariaDB support FIELD()
            return $query->whereHas('url')
                ->with('url')
                ->orderByRaw('FIELD (id, ' . implode(',', $ordered_ids) . ')');
        }
    }
}
