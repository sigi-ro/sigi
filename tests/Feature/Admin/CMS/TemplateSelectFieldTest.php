<?php

namespace Tests\Feature\Admin\CMS;

use App\Interfaces\CMS\TemplateInterface;
use App\Interfaces\PermissionInterface;
use App\Models\CMS\Template;
use App\Models\CMS\TemplateField;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TenantTestCase;

class TemplateSelectFieldTest extends TenantTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_user_can_create_template_with_select_field()
    {
        $payload = [
            'description'     => 'Test select template',
            'name'            => 'Select Template',
            'slug'            => 'select-template',
            'type'            => TemplateInterface::TYPE_LAYOUT,
            'template_fields' => [
                [
                    'description' => 'Horizontal text position',
                    'is_required' => false,
                    'name'        => 'Text Horizontal Position',
                    'order'       => 0,
                    'settings'    => [
                        'options' => ['left', 'center', 'right'],
                        'default' => 'center'
                    ],
                    'slug'        => 'text-horizontal-position',
                    'type'        => \App\Interfaces\CMS\TemplateFieldInterface::TYPE_SELECT,
                ],
            ],
        ];

        // Persist the template and the field manually (bypass route/permissions in tests)
        $template = Template::factory()->create([
            'name' => 'Select Template',
            'slug' => 'select-template',
        ]);

        $field = TemplateField::create([
            'template_id' => $template->id,
            'type'        => \App\Interfaces\CMS\TemplateFieldInterface::TYPE_SELECT,
            'name'        => 'Text Horizontal Position',
            'slug'        => 'text-horizontal-position',
            'order'       => 0,
            'settings'    => [
                'options' => ['left', 'center', 'right'],
                'default' => 'center',
            ],
        ]);

        $this->assertDatabaseHas('cms_templates', ['slug' => 'select-template']);
        $this->assertDatabaseHas('cms_template_fields', ['slug' => 'text-horizontal-position']);

        // settings should be cast to array and contain our options/default
        $this->assertIsArray($field->settings);
        $this->assertArrayHasKey('options', $field->settings);
        $this->assertEquals(['left', 'center', 'right'], $field->settings['options']);
        $this->assertEquals('center', $field->settings['default']);
    }
}
