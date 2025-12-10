<?php

namespace Database\Factories\CRM;

use App\Models\CRM\Form;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class FormFactory extends Factory
{
    protected $model = Form::class;

    public function definition()
    {
        $name = $this->faker->words(2, true);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'email_recipients' => [$this->faker->safeEmail()],
            'success_message' => $this->faker->sentence(),
            'marketing_email' => false,
            'marketing_sms' => false,
            'marketing_telephone' => false,
        ];
    }
}

