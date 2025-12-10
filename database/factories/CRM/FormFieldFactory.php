<?php

namespace Database\Factories\CRM;

use App\Models\CRM\Form;
use App\Models\CRM\FormField;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class FormFieldFactory extends Factory
{
    protected $model = FormField::class;

    public function definition()
    {
        $name = $this->faker->words(2, true);

        return [
            'form_id' => Form::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'type' => 'text',
            'is_required' => false,
            'order' => 0,
            'settings' => [],
        ];
    }
}

