<?php

namespace Database\Factories\CMS;

use App\Models\CMS\Layout;
use App\Models\CMS\Page;
use App\Models\CMS\Template;
use App\Models\CMS\Url;
use App\Interfaces\CMS\TemplateInterface;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PageFactory extends Factory
{
    protected $model = Page::class;

    public function definition()
    {
        $name = $this->faker->words(3, true);
        $slug = Str::slug($name);

        return [
            'name' => $name,
            'slug' => $slug,
            'layout_id' => Layout::factory(),
            'template_id' => Template::factory()->create(['type' => TemplateInterface::TYPE_PAGE]),
            'parent_id' => null,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Page $page) {
            // Create URL for the page if it doesn't exist
            if (!$page->url) {
                try {
                    Url::create([
                        'urlable_type' => Page::class,
                        'urlable_id' => $page->id,
                        'url_main' => $page->slug,
                        'url_full' => '/' . $page->slug,
                        'is_enabled' => true,
                        'published_at' => now(),
                    ]);
                } catch (\Exception $e) {
                    // URL might already exist, ignore
                }
            }
        });
    }
}

