<?php

namespace Tests\Feature\Admin\CMS;

use App\Models\CMS\Template;
use App\Models\CMS\TemplateField;
use Tests\TenantTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TemplateColorFieldTest extends TenantTestCase
{
    use RefreshDatabase;

    /** @test */
    public function color_field_type_is_supported_and_settings_saved()
    {
        $template = Template::factory()->create();

        $field = TemplateField::create([
            'template_id' => $template->id,
            'type' => 'color',
            'name' => 'Title Color',
            'slug' => 'title-color-test',
            'order' => 0,
            'settings' => [
                'default' => '#FF0000',
                'help_text' => 'Choose color'
            ]
        ]);

        $this->assertDatabaseHas('cms_template_fields', ['slug' => 'title-color-test', 'type' => 'color']);

        $reloaded = TemplateField::find($field->id);
        $this->assertIsArray($reloaded->settings);
        $this->assertEquals('#FF0000', $reloaded->settings['default']);
    }
}
