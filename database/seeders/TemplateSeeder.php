<?php

namespace Database\Seeders;

use App\Interfaces\CMS\TemplateFieldInterface;
use App\Interfaces\CMS\TemplateInterface;
use App\Models\CMS\Layout;
use App\Models\CMS\Template;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createLayoutTemplate();
        $this->createPageTemplate();
    }


    protected function createLayoutTemplate()
    {
        $template = Template::firstOrCreate(
            [
                'slug' => 'default-layout-template',
                'type' => TemplateInterface::TYPE_LAYOUT,
            ],
            [
                'description'   => 'Default template for layouts.',
                'name'          => 'Default Layout Template',
            ]
        );

        if (!$template->templateFields()->where('slug', 'shared-content')->exists()) {
            $template->templateFields()->create([
                'name'  => 'Shared Content',
                'order' => 0,
                'slug'  => 'shared-content',
                'type'  => TemplateFieldInterface::TYPE_TEXT,
            ]);
        }

        Layout::firstOrCreate(
            ['slug' => 'default-layout'],
            [
                'name'          => 'Default Layout',
                'template_id'   => $template->id,
            ]
        );
    }

    protected function createPageTemplate()
    {
        $template = Template::firstOrCreate(
            [
                'slug' => 'default-page-template',
                'type' => TemplateInterface::TYPE_PAGE,
            ],
            [
                'description'   => 'Default template for pages.',
                'name'          => 'Default Page Template',
            ]
        );

        if (!$template->templateFields()->where('slug', 'header')->exists()) {
            $template->templateFields()->create([
                'name'  => 'Header',
                'order' => 0,
                'slug'  => 'header',
                'type'  => TemplateFieldInterface::TYPE_TEXT,
            ]);
        }

        if (!$template->templateFields()->where('slug', 'content')->exists()) {
            $template->templateFields()->create([
                'name'  => 'Content',
                'order' => 1,
                'slug'  => 'content',
                'type'  => TemplateFieldInterface::TYPE_WYSIWYG,
            ]);
        }
    }
}
