<?php

namespace Database\Factories\CMS;

use App\Models\CMS\Layout;
use App\Models\CMS\Template;
use App\Interfaces\CMS\TemplateInterface;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LayoutFactory extends Factory
{
    protected $model = Layout::class;

    public function definition()
    {
        $name = $this->faker->words(2, true);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'template_id' => Template::factory()->create(['type' => TemplateInterface::TYPE_LAYOUT]),
        ];
    }
}

