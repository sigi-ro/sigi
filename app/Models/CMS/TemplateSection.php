<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class TemplateSection extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cms_template_sections';

    protected $fillable = [
        'template_id',
        'name',
        'slug',
        'description',
        'order',
        'is_collapsible',
        'is_collapsed_by_default',
    ];

    protected $casts = [
        'is_collapsible' => 'boolean',
        'is_collapsed_by_default' => 'boolean',
        'order' => 'integer',
    ];

    protected static function booted()
    {
        // Ensure TemplateSections are ordered via their order field by default
        static::addGlobalScope('ordered', function ($builder) {
            $builder->orderBy('order', 'asc');
        });
    }

    /**
     * Get the template that owns this section.
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Get the template fields that belong to this section.
     */
    public function templateFields(): HasMany
    {
        return $this->hasMany(TemplateField::class, 'section_id');
    }
}

