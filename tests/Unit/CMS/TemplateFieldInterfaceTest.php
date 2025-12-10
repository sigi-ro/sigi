<?php

namespace Tests\Unit\CMS;

use App\Interfaces\CMS\TemplateFieldInterface;
use PHPUnit\Framework\TestCase;

class TemplateFieldInterfaceTest extends TestCase
{
    /** @test */
    public function select_type_is_registered_in_all_types()
    {
        $this->assertContains(TemplateFieldInterface::TYPE_SELECT, TemplateFieldInterface::ALL_TYPES);
        $this->assertContains(TemplateFieldInterface::TYPE_COLOR, TemplateFieldInterface::ALL_TYPES);
    }

    /** @test */
    public function select_settings_have_options_and_default_keys()
    {
        $settings = TemplateFieldInterface::SETTINGS[TemplateFieldInterface::TYPE_SELECT] ?? null;

        $this->assertIsArray($settings);
        $this->assertArrayHasKey('options', $settings);
        $this->assertArrayHasKey('default', $settings);
    }
}
