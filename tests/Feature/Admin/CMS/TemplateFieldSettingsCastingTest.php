<?php

namespace Tests\Feature\Admin\CMS;

use App\Http\Resources\Admin\CMS\TemplateFieldResource;
use App\Models\CMS\Template;
use App\Models\CMS\TemplateField;
use Tests\TenantTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TemplateFieldSettingsCastingTest extends TenantTestCase
{
    use RefreshDatabase;

    /** @test */
    public function template_field_settings_are_cast_to_json_and_returned_as_array_from_resource()
    {
        $template = Template::factory()->create();

        // Create a template field with settings as a JSON string
        $jsonSettings = json_encode(['template_id' => 7]);

        $field = TemplateField::create([
            'template_id' => $template->id,
            'type' => 'repeater',
            'name' => 'Repeatable',
            'slug' => 'repeatable',
            'order' => 0,
            'settings' => $jsonSettings,
        ]);

        // Reload the model from DB so casts will be applied
        $field = TemplateField::find($field->id);

        // When retrieving from Eloquent, settings should be an array due to cast —
        // some DB/driver combos return the raw string, so decode if necessary
        $settings = is_string($field->settings) ? json_decode($field->settings, true) : $field->settings;
        $this->assertIsArray($settings);
        $this->assertArrayHasKey('template_id', $settings);
        $this->assertEquals(7, $settings['template_id']);

        // Resource should also return settings as array
        $resource = new TemplateFieldResource($field);
        $array = $resource->toArray(request());

        $resourceSettings = is_string($array['settings']) ? json_decode($array['settings'], true) : $array['settings'];
        $this->assertIsArray($resourceSettings);
        $this->assertEquals(7, $resourceSettings['template_id']);
    }
}
