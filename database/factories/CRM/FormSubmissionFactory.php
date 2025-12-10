<?php

namespace Database\Factories\CRM;

use App\Models\CRM\Form;
use App\Models\CRM\FormSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormSubmissionFactory extends Factory
{
    protected $model = FormSubmission::class;

    public function definition()
    {
        return [
            'form_id' => Form::factory(),
            'data' => [
                'field1' => $this->faker->word(),
                'field2' => $this->faker->sentence(),
            ],
        ];
    }
}

