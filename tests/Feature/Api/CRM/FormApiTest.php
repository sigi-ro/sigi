<?php

namespace Tests\Feature\Api\CRM;

use App\Models\CRM\Form;
use App\Models\CRM\FormField;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TenantTestCase;

class FormApiTest extends TenantTestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_form_by_slug()
    {
        $form = Form::factory()->create();
        FormField::factory()->count(3)->create(['form_id' => $form->id]);

        $response = $this->getJson(route('api.forms.show', ['slug' => $form->slug]));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'slug',
                    'fields' => [
                        '*' => [
                            'id',
                            'name',
                            'slug',
                            'type',
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function can_submit_form()
    {
        $form = Form::factory()->create();
        $field = FormField::factory()->create([
            'form_id' => $form->id,
            'type' => 'text',
            'is_required' => true,
        ]);

        $submissionData = [
            $field->slug => 'Test Value',
        ];

        $response = $this->postJson(route('api.form-submission.store', ['slug' => $form->slug]), $submissionData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
            ]);

        $this->assertDatabaseHas('crm_form_submissions', [
            'form_id' => $form->id,
        ]);
    }

    /** @test */
    public function form_submission_validates_required_fields()
    {
        $form = Form::factory()->create();
        $field = FormField::factory()->create([
            'form_id' => $form->id,
            'type' => 'text',
            'is_required' => true,
        ]);

        $response = $this->postJson(route('api.form-submission.store', ['slug' => $form->slug]), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([$field->slug]);
    }
}

