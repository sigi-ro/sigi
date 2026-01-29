<?php

namespace Database\Seeders;

use App\Interfaces\CMS\TemplateFieldInterface;
use App\Interfaces\CMS\TemplateInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ItalianBuildingServiceSeeder extends Seeder
{
    /**
     * Run the database seeds for Italian Building Service tenant.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();

        try {
            // 1. Create Layout Template
            $layoutTemplateId = $this->createLayoutTemplate();
            
            // 2. Create Layout
            $layoutId = $this->createLayout($layoutTemplateId);
            
            // 3. Create Repeater Templates (must be created before page templates that reference them)
            $servicesItemsRepeaterTemplateId = $this->createServicesItemsRepeaterTemplate();
            $portfolioItemsRepeaterTemplateId = $this->createPortfolioItemsRepeaterTemplate();
            
            // 4. Create Page Templates (Standard Page needs repeater template IDs now)
            $standardPageTemplateId = $this->createStandardPageTemplate($servicesItemsRepeaterTemplateId, $portfolioItemsRepeaterTemplateId);
            $portfolioPageTemplateId = $this->createPortfolioPageTemplate($portfolioItemsRepeaterTemplateId);
            $homePageTemplateId = $this->createHomePageTemplate($servicesItemsRepeaterTemplateId, $portfolioItemsRepeaterTemplateId);
            
            // 4. Create Pages
            $homePageId = $this->createHomePage($homePageTemplateId, $layoutId);
            $aboutPageId = $this->createAboutPage($standardPageTemplateId, $layoutId);
            $servicesPageId = $this->createServicesPage($standardPageTemplateId, $layoutId);
            $portfolioPageId = $this->createPortfolioPage($portfolioPageTemplateId, $layoutId);
            $contactPageId = $this->createContactPage($standardPageTemplateId, $layoutId);
            
            // 5. Create Navigation Menu
            $this->createNavigationMenu([
                ['label' => 'Home', 'href' => '/', 'order' => 1],
                ['label' => 'About', 'href' => '/about', 'order' => 2],
                ['label' => 'Services', 'href' => '/services', 'order' => 3],
                ['label' => 'Portfolio', 'href' => '/portfolio', 'order' => 4],
                ['label' => 'Contact', 'href' => '/contact', 'order' => 5],
            ]);
            
            // 6. Create Social Links Menu
            $this->createSocialLinksMenu([
                ['label' => 'Facebook', 'href' => 'https://facebook.com', 'target' => '_blank', 'order' => 1],
                ['label' => 'LinkedIn', 'href' => 'https://linkedin.com', 'target' => '_blank', 'order' => 2],
                ['label' => 'Instagram', 'href' => 'https://instagram.com', 'target' => '_blank', 'order' => 3],
            ]);
            
            // 7. Create Contact Form
            $this->createContactForm();
            
            DB::commit();
            
            $this->command->info('Italian Building Service pages and content created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error creating pages: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function createLayoutTemplate(): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_LAYOUT)
            ->where('slug', 'default-layout')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_LAYOUT,
                'name' => 'Default Layout',
                'slug' => 'default-layout',
                'description' => 'Default layout for Italian Building Service',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Create layout template fields (idempotent)
        $fieldExists = DB::table('cms_template_fields')
            ->where('template_id', $templateId)
            ->where('slug', 'copyright-text')
            ->exists();

        if (!$fieldExists) {
            DB::table('cms_template_fields')->insert([
                [
                    'template_id' => $templateId,
                    'type' => TemplateFieldInterface::TYPE_TEXT,
                    'name' => 'Copyright Text',
                    'slug' => 'copyright-text',
                    'description' => 'Copyright text displayed in footer',
                    'is_required' => false,
                    'order' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }

        return $templateId;
    }

    protected function createLayout(int $templateId): int
    {
        $layout = DB::table('cms_layouts')
            ->where('slug', 'default-layout')
            ->first();

        if ($layout) {
            $layoutId = $layout->id;
        } else {
            $layoutId = DB::table('cms_layouts')->insertGetId([
                'name' => 'Default Layout',
                'slug' => 'default-layout',
                'template_id' => $templateId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Create layout content (idempotent)
        $copyrightFieldId = DB::table('cms_template_fields')
            ->where('template_id', $templateId)
            ->where('slug', 'copyright-text')
            ->value('id');

        if ($copyrightFieldId) {
            $contentExists = DB::table('cms_content')
                ->where('contentable_id', $layoutId)
                ->where('contentable_type', 'App\Models\CMS\Layout')
                ->where('template_field_id', $copyrightFieldId)
                ->exists();

            if (!$contentExists) {
                DB::table('cms_content')->insert([
                    'contentable_id' => $layoutId,
                    'contentable_type' => 'App\Models\CMS\Layout',
                    'template_field_id' => $copyrightFieldId,
                    'template_field_type' => TemplateFieldInterface::TYPE_TEXT,
                    'data' => 'Italian Building Service SRL. All Rights Reserved.',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return $layoutId;
    }

    protected function createStandardPageTemplate(int $servicesItemsRepeaterTemplateId, int $portfolioItemsRepeaterTemplateId): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_PAGE)
            ->where('slug', 'standard-page')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_PAGE,
                'name' => 'Standard Page',
                'slug' => 'standard-page',
                'description' => 'Standard page template for content pages',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Include ALL possible fields so any page can use any section type
        $fields = [
            // Header/Hero section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero Title', 'slug' => 'hero-title', 'order' => 1],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero Subtitle', 'slug' => 'hero-subtitle', 'order' => 2],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Hero Description', 'slug' => 'hero-description', 'order' => 3],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'Hero Image', 'slug' => 'hero-image', 'order' => 4],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero CTA Text', 'slug' => 'hero-cta-text', 'order' => 5],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero CTA URL', 'slug' => 'hero-cta-url', 'order' => 6],
            // Services section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Services Title', 'slug' => 'services-title', 'order' => 7],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Services Description', 'slug' => 'services-description', 'order' => 8],
            ['type' => TemplateFieldInterface::TYPE_REPEATER, 'name' => 'Services Items', 'slug' => 'services-items', 'order' => 9],
            // About Us section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About Title', 'slug' => 'about-title', 'order' => 10],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'About Text', 'slug' => 'about-text', 'order' => 11],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'About Image', 'slug' => 'about-image', 'order' => 12],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About CTA Text', 'slug' => 'about-cta-text', 'order' => 13],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About CTA URL', 'slug' => 'about-cta-url', 'order' => 14],
            // Portfolio section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Portfolio Title', 'slug' => 'portfolio-title', 'order' => 15],
            ['type' => TemplateFieldInterface::TYPE_REPEATER, 'name' => 'Portfolio Items', 'slug' => 'portfolio-items', 'order' => 16],
            // Contact section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Contact Title', 'slug' => 'contact-title', 'order' => 17],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Contact Text', 'slug' => 'contact-text', 'order' => 18],
            ['type' => TemplateFieldInterface::TYPE_CRM_FORM, 'name' => 'Contact Form', 'slug' => 'contact-form', 'order' => 19],
            // General content field
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Main Content', 'slug' => 'main-content', 'order' => 20],
        ];

        foreach ($fields as $field) {
            $fieldExists = DB::table('cms_template_fields')
                ->where('template_id', $templateId)
                ->where('slug', $field['slug'])
                ->first();

            $settings = null;
            if ($field['type'] === TemplateFieldInterface::TYPE_REPEATER) {
                $settings = json_encode([
                    'template_id' => $field['slug'] === 'services-items' ? $servicesItemsRepeaterTemplateId : $portfolioItemsRepeaterTemplateId
                ]);
            }

            if (!$fieldExists) {
                DB::table('cms_template_fields')->insert([
                    'template_id' => $templateId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => false,
                    'order' => $field['order'],
                    'settings' => $settings,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                // Update existing field to ensure order and settings are correct
                $updates = [
                    'order' => $field['order'],
                    'updated_at' => now(),
                ];
                if ($settings !== null) {
                    $updates['settings'] = $settings;
                }
                DB::table('cms_template_fields')
                    ->where('id', $fieldExists->id)
                    ->update($updates);
            }
        }

        return $templateId;
    }

    protected function createServicesItemsRepeaterTemplate(): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_REPEATER)
            ->where('slug', 'services-items-repeater')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_REPEATER,
                'name' => 'Services Items Repeater',
                'slug' => 'services-items-repeater',
                'description' => 'Repeater template for service items',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $fields = [
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Service Title', 'slug' => 'service-title', 'order' => 1],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Service Description', 'slug' => 'service-description', 'order' => 2],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'Service Image', 'slug' => 'service-image', 'order' => 3],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Service Icon', 'slug' => 'service-icon', 'order' => 4],
        ];

        foreach ($fields as $field) {
            $fieldExists = DB::table('cms_template_fields')
                ->where('template_id', $templateId)
                ->where('slug', $field['slug'])
                ->exists();

            if (!$fieldExists) {
                DB::table('cms_template_fields')->insert([
                    'template_id' => $templateId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => false,
                    'order' => $field['order'],
                    'settings' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return $templateId;
    }

    protected function createPortfolioItemsRepeaterTemplate(): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_REPEATER)
            ->where('slug', 'portfolio-items-repeater')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_REPEATER,
                'name' => 'Portfolio Items Repeater',
                'slug' => 'portfolio-items-repeater',
                'description' => 'Repeater template for portfolio items',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $fields = [
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Project Title', 'slug' => 'project-title', 'order' => 1],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'Project Image', 'slug' => 'project-image', 'order' => 2],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Project Category', 'slug' => 'project-category', 'order' => 3],
        ];

        foreach ($fields as $field) {
            $fieldExists = DB::table('cms_template_fields')
                ->where('template_id', $templateId)
                ->where('slug', $field['slug'])
                ->exists();

            if (!$fieldExists) {
                DB::table('cms_template_fields')->insert([
                    'template_id' => $templateId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => false,
                    'order' => $field['order'],
                    'settings' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return $templateId;
    }

    protected function createPortfolioPageTemplate(int $portfolioItemsRepeaterTemplateId): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_PAGE)
            ->where('slug', 'portfolio-gallery-page')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_PAGE,
                'name' => 'Portfolio Gallery Page',
                'slug' => 'portfolio-gallery-page',
                'description' => 'Portfolio gallery page template',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $fields = [
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero Title', 'slug' => 'hero-title', 'order' => 1],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Hero Description', 'slug' => 'hero-description', 'order' => 2],
            ['type' => TemplateFieldInterface::TYPE_REPEATER, 'name' => 'Portfolio Items', 'slug' => 'portfolio-items', 'order' => 3],
        ];

        foreach ($fields as $field) {
            $existingField = DB::table('cms_template_fields')
                ->where('template_id', $templateId)
                ->where('slug', $field['slug'])
                ->first();

            if (!$existingField) {
                DB::table('cms_template_fields')->insert([
                    'template_id' => $templateId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => false,
                    'order' => $field['order'],
                    'settings' => $field['type'] === TemplateFieldInterface::TYPE_REPEATER ? json_encode([
                        'template_id' => $portfolioItemsRepeaterTemplateId
                    ]) : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]); 
            } else {
                // Update order and settings if field exists
                $updates = [];
                if ($existingField->order != $field['order']) {
                    $updates['order'] = $field['order'];
                }
                // Update settings for repeater fields to use template_id
                if ($field['type'] === TemplateFieldInterface::TYPE_REPEATER) {
                    $currentSettings = json_decode($existingField->settings, true);
                    if (!isset($currentSettings['template_id']) || $currentSettings['template_id'] != $portfolioItemsRepeaterTemplateId) {
                        $updates['settings'] = json_encode(['template_id' => $portfolioItemsRepeaterTemplateId]);
                    }
                }
                if (!empty($updates)) {
                    $updates['updated_at'] = now();
                    DB::table('cms_template_fields')
                        ->where('id', $existingField->id)
                        ->update($updates);
                }
            }
        }

        return $templateId;
    }

    protected function createHomePageTemplate(int $servicesItemsRepeaterTemplateId, int $portfolioItemsRepeaterTemplateId): int
    {
        $template = DB::table('cms_templates')
            ->where('type', TemplateInterface::TYPE_PAGE)
            ->where('slug', 'home-page')
            ->first();

        if ($template) {
            $templateId = $template->id;
        } else {
            $templateId = DB::table('cms_templates')->insertGetId([
                'type' => TemplateInterface::TYPE_PAGE,
                'name' => 'Home Page',
                'slug' => 'home-page',
                'description' => 'Homepage template for Italian Building Service',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $fields = [
            // Header section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero Title', 'slug' => 'hero-title', 'order' => 1, 'section' => 'header'],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero Subtitle', 'slug' => 'hero-subtitle', 'order' => 2, 'section' => 'header'],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Hero Description', 'slug' => 'hero-description', 'order' => 3, 'section' => 'header'],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'Hero Image', 'slug' => 'hero-image', 'order' => 4, 'section' => 'header'],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero CTA Text', 'slug' => 'hero-cta-text', 'order' => 5, 'section' => 'header'],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Hero CTA URL', 'slug' => 'hero-cta-url', 'order' => 6, 'section' => 'header'],
            // Services section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Services Title', 'slug' => 'services-title', 'order' => 7, 'section' => 'services'],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Services Description', 'slug' => 'services-description', 'order' => 8, 'section' => 'services'],
            ['type' => TemplateFieldInterface::TYPE_REPEATER, 'name' => 'Services Items', 'slug' => 'services-items', 'order' => 9, 'section' => 'services'],
            // About Us section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About Title', 'slug' => 'about-title', 'order' => 10, 'section' => 'about-us'],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'About Text', 'slug' => 'about-text', 'order' => 11, 'section' => 'about-us'],
            ['type' => TemplateFieldInterface::TYPE_IMAGE, 'name' => 'About Image', 'slug' => 'about-image', 'order' => 12, 'section' => 'about-us'],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About CTA Text', 'slug' => 'about-cta-text', 'order' => 13, 'section' => 'about-us'],
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'About CTA URL', 'slug' => 'about-cta-url', 'order' => 14, 'section' => 'about-us'],
            // Portfolio section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Portfolio Title', 'slug' => 'portfolio-title', 'order' => 15, 'section' => 'portfolio'],
            ['type' => TemplateFieldInterface::TYPE_REPEATER, 'name' => 'Portfolio Items', 'slug' => 'portfolio-items', 'order' => 16, 'section' => 'portfolio'],
            // Contact section fields
            ['type' => TemplateFieldInterface::TYPE_TEXT, 'name' => 'Contact Title', 'slug' => 'contact-title', 'order' => 17, 'section' => 'contact'],
            ['type' => TemplateFieldInterface::TYPE_WYSIWYG, 'name' => 'Contact Text', 'slug' => 'contact-text', 'order' => 18, 'section' => 'contact'],
            ['type' => TemplateFieldInterface::TYPE_CRM_FORM, 'name' => 'Contact Form', 'slug' => 'contact-form', 'order' => 19, 'section' => 'contact'],
        ];

        foreach ($fields as $field) {
            $existingField = DB::table('cms_template_fields')
                ->where('template_id', $templateId)
                ->where('slug', $field['slug'])
                ->first();

            if (!$existingField) {
                DB::table('cms_template_fields')->insert([
                    'template_id' => $templateId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => false,
                    'order' => $field['order'],
                    'section_id' => null, // Will be assigned after sections are created
                    'settings' => $field['type'] === TemplateFieldInterface::TYPE_REPEATER ? json_encode([
                        'template_id' => $field['slug'] === 'services-items' ? $servicesItemsRepeaterTemplateId : $portfolioItemsRepeaterTemplateId
                    ]) : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                // Update order and settings if field exists
                $updates = [];
                if ($existingField->order != $field['order']) {
                    $updates['order'] = $field['order'];
                }
                // Update settings for repeater fields to use template_id
                if ($field['type'] === TemplateFieldInterface::TYPE_REPEATER) {
                    $currentSettings = json_decode($existingField->settings, true);
                    if (!isset($currentSettings['template_id']) || (isset($currentSettings['template_id']) && $currentSettings['template_id'] != $portfolioItemsRepeaterTemplateId)) {
                        $updates['settings'] = json_encode(['template_id' => $portfolioItemsRepeaterTemplateId]);
                    }
                }
                if (!empty($updates)) {
                    $updates['updated_at'] = now();
                    DB::table('cms_template_fields')
                        ->where('id', $existingField->id)
                        ->update($updates);
                }
            }
        }

        // Create sections and assign fields
        $this->createHomePageSections($templateId);

        return $templateId;
    }

    protected function createHomePageSections(int $templateId): void
    {
        // Define sections
        $sections = [
            [
                'name' => 'Header',
                'slug' => 'header',
                'description' => 'Hero section fields for the homepage',
                'order' => 1,
            ],
            [
                'name' => 'Services',
                'slug' => 'services',
                'description' => 'Services section fields',
                'order' => 2,
            ],
            [
                'name' => 'About Us',
                'slug' => 'about-us',
                'description' => 'About us section fields',
                'order' => 3,
            ],
            [
                'name' => 'Portfolio',
                'slug' => 'portfolio',
                'description' => 'Portfolio section fields',
                'order' => 4,
            ],
            [
                'name' => 'Contact',
                'slug' => 'contact',
                'description' => 'Contact section fields',
                'order' => 5,
            ],
        ];

        $sectionIds = [];

        // Create sections
        foreach ($sections as $sectionData) {
            $section = DB::table('cms_template_sections')
                ->where('template_id', $templateId)
                ->where('slug', $sectionData['slug'])
                ->first();

            if ($section) {
                $sectionIds[$sectionData['slug']] = $section->id;
            } else {
                $sectionId = DB::table('cms_template_sections')->insertGetId([
                    'template_id' => $templateId,
                    'name' => $sectionData['name'],
                    'slug' => $sectionData['slug'],
                    'description' => $sectionData['description'],
                    'order' => $sectionData['order'],
                    'is_collapsible' => true,
                    'is_collapsed_by_default' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $sectionIds[$sectionData['slug']] = $sectionId;
            }
        }

        // Assign fields to sections based on their slugs
        $fieldSectionMapping = [
            // Header section
            'hero-title' => 'header',
            'hero-subtitle' => 'header',
            'hero-description' => 'header',
            'hero-image' => 'header',
            'hero-cta-text' => 'header',
            'hero-cta-url' => 'header',
            // Services section
            'services-title' => 'services',
            'services-description' => 'services',
            'services-items' => 'services',
            // About Us section
            'about-title' => 'about-us',
            'about-text' => 'about-us',
            'about-image' => 'about-us',
            'about-cta-text' => 'about-us',
            'about-cta-url' => 'about-us',
            // Portfolio section
            'portfolio-title' => 'portfolio',
            'portfolio-items' => 'portfolio',
            // Contact section
            'contact-title' => 'contact',
            'contact-text' => 'contact',
            'contact-form' => 'contact',
        ];

        // Update fields with section_id
        foreach ($fieldSectionMapping as $fieldSlug => $sectionSlug) {
            if (isset($sectionIds[$sectionSlug])) {
                DB::table('cms_template_fields')
                    ->where('template_id', $templateId)
                    ->where('slug', $fieldSlug)
                    ->update([
                        'section_id' => $sectionIds[$sectionSlug],
                        'updated_at' => now(),
                    ]);
            }
        }
    }

    protected function createHomePage(int $templateId, int $layoutId): int
    {
        $page = DB::table('cms_pages')->where('slug', 'home')->first();

        if ($page) {
            $pageId = $page->id;
        } else {
            $pageId = DB::table('cms_pages')->insertGetId([
                'name' => 'Home',
                'slug' => 'home',
                'layout_id' => $layoutId,
                'template_id' => $templateId,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Create URL
            DB::table('cms_urls')->insert([
                'urlable_id' => $pageId,
                'urlable_type' => 'App\Models\CMS\Page',
                'url_main' => 'home',
                'url_full' => '/',
                'is_enabled' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Get contact form ID for the contact-form field
        $contactForm = DB::table('crm_forms')->where('slug', 'contact-form')->first();
        $contactFormId = $contactForm ? $contactForm->id : null;

        // Create default content (idempotent - only if content doesn't exist)
        $pageContent = [
            'hero-title' => 'Italian Building Service',
            'hero-subtitle' => 'Professional Construction & Building Services',
            'hero-description' => '<p>Quality craftsmanship for your building projects. We deliver excellence in construction services across Romania and Italy.</p>',
            'hero-cta-text' => 'Get Started',
            'hero-cta-url' => '/contact',
            'services-title' => 'Our Services',
            'services-description' => '<p>We offer comprehensive construction and building services tailored to your needs.</p>',
            'about-title' => 'About Us',
            'about-text' => '<p>Italian Building Service is a professional construction company providing high-quality building services. With expertise spanning construction, renovation, and project management, we deliver excellence in every project.</p>',
            'about-cta-text' => 'Learn More',
            'about-cta-url' => '/about',
            'portfolio-title' => 'Our Portfolio',
            'contact-title' => 'Get In Touch',
            'contact-text' => '<p>Ready to start your next construction project? Contact us today.</p>',
        ];

        // Add contact form ID if form exists
        if ($contactFormId) {
            $pageContent['contact-form'] = $contactFormId;
        }

        $this->createPageContent($pageId, $templateId, $pageContent);

        return $pageId;
    }

    protected function createAboutPage(int $templateId, int $layoutId): int
    {
        $page = DB::table('cms_pages')->where('slug', 'about')->first();

        if ($page) {
            $pageId = $page->id;
        } else {
            $pageId = DB::table('cms_pages')->insertGetId([
                'name' => 'About',
                'slug' => 'about',
                'layout_id' => $layoutId,
                'template_id' => $templateId,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('cms_urls')->insert([
                'urlable_id' => $pageId,
                'urlable_type' => 'App\Models\CMS\Page',
                'url_main' => 'about',
                'url_full' => '/about',
                'is_enabled' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->createPageContent($pageId, $templateId, [
            'hero-title' => 'About Us',
            'hero-subtitle' => 'Professional Construction Services',
            'main-content' => '<h2>Who We Are</h2><p>Italian Building Service is a leading construction company specializing in high-quality building services. Based in Baia Mare, Romania, we serve clients across Romania and Italy.</p><h2>Our Mission</h2><p>To deliver exceptional construction services with a focus on quality, reliability, and customer satisfaction. We combine Italian craftsmanship with modern construction techniques.</p><h2>Our Values</h2><ul><li>Quality craftsmanship</li><li>Professional service</li><li>Timely delivery</li><li>Customer satisfaction</li></ul>',
        ]);

        return $pageId;
    }

    protected function createServicesPage(int $templateId, int $layoutId): int
    {
        $page = DB::table('cms_pages')->where('slug', 'services')->first();

        if ($page) {
            $pageId = $page->id;
        } else {
            $pageId = DB::table('cms_pages')->insertGetId([
                'name' => 'Services',
                'slug' => 'services',
                'layout_id' => $layoutId,
                'template_id' => $templateId,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('cms_urls')->insert([
                'urlable_id' => $pageId,
                'urlable_type' => 'App\Models\CMS\Page',
                'url_main' => 'services',
                'url_full' => '/services',
                'is_enabled' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->createPageContent($pageId, $templateId, [
            'hero-title' => 'Our Services',
            'hero-subtitle' => 'Comprehensive Construction Solutions',
            'main-content' => '<h2>Construction Services</h2><p>We offer a wide range of construction and building services to meet your project needs.</p><h3>New Construction</h3><p>Complete construction services for new buildings, from planning to completion.</p><h3>Renovation & Remodeling</h3><p>Transform existing spaces with our professional renovation services.</p><h3>Project Management</h3><p>Expert project management to ensure your construction project runs smoothly.</p><h3>Consulting</h3><p>Professional consulting services for construction planning and design.</p>',
        ]);

        return $pageId;
    }

    protected function createPortfolioPage(int $templateId, int $layoutId): int
    {
        $page = DB::table('cms_pages')->where('slug', 'portfolio')->first();

        if ($page) {
            $pageId = $page->id;
        } else {
            $pageId = DB::table('cms_pages')->insertGetId([
                'name' => 'Portfolio',
                'slug' => 'portfolio',
                'layout_id' => $layoutId,
                'template_id' => $templateId,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('cms_urls')->insert([
                'urlable_id' => $pageId,
                'urlable_type' => 'App\Models\CMS\Page',
                'url_main' => 'portfolio',
                'url_full' => '/portfolio',
                'is_enabled' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->createPageContent($pageId, $templateId, [
            'hero-title' => 'Our Portfolio',
            'hero-description' => '<p>Explore our completed projects and see the quality of our work.</p>',
        ]);

        return $pageId;
    }

    protected function createContactPage(int $templateId, int $layoutId): int
    {
        $page = DB::table('cms_pages')->where('slug', 'contact')->first();

        if ($page) {
            $pageId = $page->id;
        } else {
            $pageId = DB::table('cms_pages')->insertGetId([
                'name' => 'Contact',
                'slug' => 'contact',
                'layout_id' => $layoutId,
                'template_id' => $templateId,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('cms_urls')->insert([
                'urlable_id' => $pageId,
                'urlable_type' => 'App\Models\CMS\Page',
                'url_main' => 'contact',
                'url_full' => '/contact',
                'is_enabled' => true,
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->createPageContent($pageId, $templateId, [
            'hero-title' => 'Contact Us',
            'hero-subtitle' => 'Get in Touch',
            'main-content' => '<h2>Get In Touch</h2><p>Ready to start your next construction project? Contact us today for a consultation.</p><h3>Contact Information</h3><p><strong>Address:</strong> Str. Victoriei 3, etaj 1, ap. 26, Baia Mare, MM, Romania</p><p><strong>Phone:</strong> <a href="tel:+393339765006">+39 333 976 5006</a> / <a href="tel:+40770608041">+40 770 608 041</a></p><p><strong>Email:</strong> <a href="mailto:gerry.becchimanzi@gmail.com">gerry.becchimanzi@gmail.com</a></p>',
        ]);

        return $pageId;
    }

    protected function createPageContent(int $pageId, int $templateId, array $contentData): void
    {
        $fields = DB::table('cms_template_fields')
            ->where('template_id', $templateId)
            ->get();

        foreach ($fields as $field) {
            if (isset($contentData[$field->slug])) {
                $contentExists = DB::table('cms_content')
                    ->where('contentable_id', $pageId)
                    ->where('contentable_type', 'App\Models\CMS\Page')
                    ->where('template_field_id', $field->id)
                    ->exists();

                if (!$contentExists) {
                    DB::table('cms_content')->insert([
                        'contentable_id' => $pageId,
                        'contentable_type' => 'App\Models\CMS\Page',
                        'template_field_id' => $field->id,
                        'template_field_type' => $field->type,
                        'data' => $contentData[$field->slug],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    protected function createNavigationMenu(array $items): void
    {
        $menuItems = [];
        foreach ($items as $item) {
            $menuItems[] = [
                'label' => $item['label'],
                'href' => $item['href'],
                'order' => $item['order'],
            ];
        }

        $menu = DB::table('cms_menus')
            ->where('slug', 'main-navigation')
            ->first();

        if (!$menu) {
            DB::table('cms_menus')->insert([
                'name' => 'Main Navigation',
                'slug' => 'main-navigation',
                'menu_items' => json_encode($menuItems),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            // Update existing menu
            DB::table('cms_menus')
                ->where('slug', 'main-navigation')
                ->update([
                    'menu_items' => json_encode($menuItems),
                    'updated_at' => now(),
                ]);
        }
    }

    protected function createSocialLinksMenu(array $items): void
    {
        $menuItems = [];
        foreach ($items as $item) {
            $menuItem = [
                'label' => $item['label'],
                'href' => $item['href'],
                'order' => $item['order'],
            ];
            
            // Add target if provided
            if (isset($item['target'])) {
                $menuItem['target'] = $item['target'];
            }
            
            // Add rel for external links
            if (isset($item['target']) && $item['target'] === '_blank') {
                $menuItem['rel'] = 'noopener noreferrer';
            }
            
            $menuItems[] = $menuItem;
        }

        $menu = DB::table('cms_menus')
            ->where('slug', 'social-links')
            ->first();

        if (!$menu) {
            DB::table('cms_menus')->insert([
                'name' => 'Social Links',
                'slug' => 'social-links',
                'menu_items' => json_encode($menuItems),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            // Update existing menu
            DB::table('cms_menus')
                ->where('slug', 'social-links')
                ->update([
                    'menu_items' => json_encode($menuItems),
                    'updated_at' => now(),
                ]);
        }
    }

    protected function createContactForm(): void
    {
        $form = DB::table('crm_forms')->where('slug', 'contact-form')->first();

        if ($form) {
            $formId = $form->id;
        } else {
            $formId = DB::table('crm_forms')->insertGetId([
                'name' => 'Contact Form',
                'slug' => 'contact-form',
                'email_recipients' => json_encode(['gerry.becchimanzi@gmail.com']),
                'marketing_email' => false,
                'marketing_sms' => false,
                'marketing_telephone' => false,
                'success_message' => 'Thank you for your message! We will get back to you soon.',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $fields = [
            ['type' => 'text', 'name' => 'Name', 'slug' => 'name', 'is_required' => true, 'order' => 1],
            ['type' => 'email', 'name' => 'Email', 'slug' => 'email', 'is_required' => true, 'order' => 2],
            ['type' => 'text', 'name' => 'Phone', 'slug' => 'phone', 'is_required' => false, 'order' => 3],
            ['type' => 'text', 'name' => 'Subject', 'slug' => 'subject', 'is_required' => true, 'order' => 4],
            ['type' => 'textarea', 'name' => 'Message', 'slug' => 'message', 'is_required' => true, 'order' => 5],
        ];

        foreach ($fields as $field) {
            $fieldExists = DB::table('crm_form_fields')
                ->where('form_id', $formId)
                ->where('slug', $field['slug'])
                ->exists();

            if (!$fieldExists) {
                DB::table('crm_form_fields')->insert([
                    'form_id' => $formId,
                    'type' => $field['type'],
                    'name' => $field['name'],
                    'slug' => $field['slug'],
                    'is_required' => $field['is_required'],
                    'order' => $field['order'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

