<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // This migration creates a "Hero Section" component template
        // with all fields needed for full control of hero sections
        
        // 1. Create the Hero Section component template
        $componentTemplateId = DB::table('cms_templates')->insertGetId([
            'name' => 'Hero Section',
            'slug' => 'hero-section',
            'type' => 'component',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Add all template fields for the Hero Section component
        $fields = [
            // Images
            [
                'name' => 'Background Image',
                'slug' => 'background-image',
                'type' => 'image',
                'is_required' => false,
                'order' => 1,
                'settings' => json_encode([
                    'help_text' => 'Main background image for the hero section'
                ]),
            ],
            [
                'name' => 'Foreground Image',
                'slug' => 'foreground-image',
                'type' => 'image',
                'is_required' => false,
                'order' => 2,
                'settings' => json_encode([
                    'help_text' => 'Optional overlay figure/artwork image'
                ]),
            ],
            [
                'name' => 'Video Background URL',
                'slug' => 'video-background-url',
                'type' => 'text',
                'is_required' => false,
                'order' => 3,
                'settings' => json_encode([
                    'help_text' => 'MP4 video URL for background (overrides image if set)'
                ]),
            ],
            
            // Content
            [
                'name' => 'Title',
                'slug' => 'title',
                'type' => 'text',
                'is_required' => false,
                'order' => 4,
                'settings' => json_encode([
                    'help_text' => 'Main heading text'
                ]),
            ],
            [
                'name' => 'Subtitle',
                'slug' => 'subtitle',
                'type' => 'textarea',
                'is_required' => false,
                'order' => 5,
                'settings' => json_encode([
                    'help_text' => 'Supporting text below title'
                ]),
            ],
            [
                'name' => 'Description',
                'slug' => 'description',
                'type' => 'wysiwyg',
                'is_required' => false,
                'order' => 6,
                'settings' => json_encode([
                    'help_text' => 'Rich text content (optional)'
                ]),
            ],
            
            // Layout Controls
            [
                'name' => 'Text Horizontal Position',
                'slug' => 'text-horizontal-position',
                'type' => 'text',
                'is_required' => false,
                'order' => 7,
                'settings' => json_encode([
                    'help_text' => 'left, center, or right',
                    'default' => 'center'
                ]),
            ],
            [
                'name' => 'Text Vertical Position',
                'slug' => 'text-vertical-position',
                'type' => 'text',
                'is_required' => false,
                'order' => 8,
                'settings' => json_encode([
                    'help_text' => 'top, center, or bottom',
                    'default' => 'center'
                ]),
            ],
            [
                'name' => 'Section Height',
                'slug' => 'section-height',
                'type' => 'text',
                'is_required' => false,
                'order' => 9,
                'settings' => json_encode([
                    'help_text' => '50vh, 75vh, 100vh, or custom like 600px',
                    'default' => '100vh'
                ]),
            ],
            [
                'name' => 'Container Width',
                'slug' => 'container-width',
                'type' => 'text',
                'is_required' => false,
                'order' => 10,
                'settings' => json_encode([
                    'help_text' => 'full, container, or custom like 1200px',
                    'default' => 'container'
                ]),
            ],
            
            // Background Styling
            [
                'name' => 'Background Overlay Opacity',
                'slug' => 'background-overlay-opacity',
                'type' => 'number',
                'is_required' => false,
                'order' => 11,
                'settings' => json_encode([
                    'help_text' => '0-100 (0 = transparent, 100 = opaque)',
                    'default' => '40'
                ]),
            ],
            [
                'name' => 'Background Overlay Color',
                'slug' => 'background-overlay-color',
                'type' => 'text',
                'is_required' => false,
                'order' => 12,
                'settings' => json_encode([
                    'help_text' => 'Hex color for overlay (e.g., #000000)',
                    'default' => '#000000'
                ]),
            ],
            [
                'name' => 'Background Position',
                'slug' => 'background-position',
                'type' => 'text',
                'is_required' => false,
                'order' => 13,
                'settings' => json_encode([
                    'help_text' => 'center, top, bottom, left, right',
                    'default' => 'center'
                ]),
            ],
            
            // Text Styling
            [
                'name' => 'Title Color',
                'slug' => 'title-color',
                'type' => 'text',
                'is_required' => false,
                'order' => 14,
                'settings' => json_encode([
                    'help_text' => 'Hex color (e.g., #FFFFFF)',
                    'default' => '#FFFFFF'
                ]),
            ],
            [
                'name' => 'Title Font Size',
                'slug' => 'title-font-size',
                'type' => 'text',
                'is_required' => false,
                'order' => 15,
                'settings' => json_encode([
                    'help_text' => 'e.g., 4rem, 72px, clamp(2rem, 5vw, 4rem)',
                    'default' => 'clamp(3rem, 8vw, 7rem)'
                ]),
            ],
            [
                'name' => 'Subtitle Color',
                'slug' => 'subtitle-color',
                'type' => 'text',
                'is_required' => false,
                'order' => 16,
                'settings' => json_encode([
                    'help_text' => 'Hex color (e.g., #CCCCCC)',
                    'default' => '#E5E7EB'
                ]),
            ],
            [
                'name' => 'Text Shadow',
                'slug' => 'text-shadow',
                'type' => 'text',
                'is_required' => false,
                'order' => 17,
                'settings' => json_encode([
                    'help_text' => 'CSS text-shadow value or "none"',
                    'default' => '0 2px 10px rgba(0,0,0,0.3)'
                ]),
            ],
            
            // Animation & Effects
            [
                'name' => 'Enable Parallax',
                'slug' => 'enable-parallax',
                'type' => 'checkbox',
                'is_required' => false,
                'order' => 18,
                'settings' => json_encode([
                    'help_text' => 'Enable parallax scrolling effect'
                ]),
            ],
            [
                'name' => 'Parallax Speed',
                'slug' => 'parallax-speed',
                'type' => 'text',
                'is_required' => false,
                'order' => 19,
                'settings' => json_encode([
                    'help_text' => 'slow, medium, fast (only if parallax enabled)',
                    'default' => 'medium'
                ]),
            ],
            [
                'name' => 'Entrance Animation',
                'slug' => 'entrance-animation',
                'type' => 'text',
                'is_required' => false,
                'order' => 20,
                'settings' => json_encode([
                    'help_text' => 'fade, slide-up, slide-down, zoom, none',
                    'default' => 'fade'
                ]),
            ],
            [
                'name' => 'Animation Duration',
                'slug' => 'animation-duration',
                'type' => 'text',
                'is_required' => false,
                'order' => 21,
                'settings' => json_encode([
                    'help_text' => 'Duration in ms (e.g., 800)',
                    'default' => '1000'
                ]),
            ],
            
            // Interactive Elements
            [
                'name' => 'Show Scroll Indicator',
                'slug' => 'show-scroll-indicator',
                'type' => 'checkbox',
                'is_required' => false,
                'order' => 22,
                'settings' => json_encode([
                    'help_text' => 'Show animated down arrow'
                ]),
            ],
            [
                'name' => 'CTA Button Text',
                'slug' => 'cta-button-text',
                'type' => 'text',
                'is_required' => false,
                'order' => 23,
                'settings' => json_encode([
                    'help_text' => 'Call-to-action button text (leave empty to hide)'
                ]),
            ],
            [
                'name' => 'CTA Button URL',
                'slug' => 'cta-button-url',
                'type' => 'text',
                'is_required' => false,
                'order' => 24,
                'settings' => json_encode([
                    'help_text' => 'URL for CTA button'
                ]),
            ],
            [
                'name' => 'CTA Button Style',
                'slug' => 'cta-button-style',
                'type' => 'text',
                'is_required' => false,
                'order' => 25,
                'settings' => json_encode([
                    'help_text' => 'primary, secondary, ghost',
                    'default' => 'primary'
                ]),
            ],
            
            // Mobile Responsive Settings
            [
                'name' => 'Mobile Height',
                'slug' => 'mobile-height',
                'type' => 'text',
                'is_required' => false,
                'order' => 26,
                'settings' => json_encode([
                    'help_text' => 'Height on mobile devices (e.g., 70vh, auto)',
                    'default' => 'auto'
                ]),
            ],
            [
                'name' => 'Mobile Text Position',
                'slug' => 'mobile-text-position',
                'type' => 'text',
                'is_required' => false,
                'order' => 27,
                'settings' => json_encode([
                    'help_text' => 'Override text position on mobile (left, center, right) or leave empty',
                    'default' => 'center'
                ]),
            ],
            [
                'name' => 'Mobile Title Font Size',
                'slug' => 'mobile-title-font-size',
                'type' => 'text',
                'is_required' => false,
                'order' => 28,
                'settings' => json_encode([
                    'help_text' => 'Font size on mobile or leave empty for auto',
                    'default' => 'clamp(2rem, 6vw, 3rem)'
                ]),
            ],
            [
                'name' => 'Hide Foreground on Mobile',
                'slug' => 'hide-foreground-mobile',
                'type' => 'checkbox',
                'is_required' => false,
                'order' => 29,
                'settings' => json_encode([
                    'help_text' => 'Hide foreground image on small screens'
                ]),
            ],
            
            // Advanced
            [
                'name' => 'Custom CSS Class',
                'slug' => 'custom-css-class',
                'type' => 'text',
                'is_required' => false,
                'order' => 30,
                'settings' => json_encode([
                    'help_text' => 'Additional CSS classes for custom styling'
                ]),
            ],
            [
                'name' => 'Section ID',
                'slug' => 'section-id',
                'type' => 'text',
                'is_required' => false,
                'order' => 31,
                'settings' => json_encode([
                    'help_text' => 'HTML ID for anchor links'
                ]),
            ],
        ];

        foreach ($fields as $field) {
            DB::table('cms_template_fields')->insert([
                'template_id' => $componentTemplateId,
                'name' => $field['name'],
                'slug' => $field['slug'],
                'type' => $field['type'],
                'is_required' => $field['is_required'],
                'order' => $field['order'],
                'settings' => $field['settings'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. Add component field to home-page template
        $homePageTemplateId = DB::table('cms_templates')
            ->where('slug', 'home-page')
            ->value('id');

        if ($homePageTemplateId) {
            // Get the highest order number
            $maxOrder = DB::table('cms_template_fields')
                ->where('template_id', $homePageTemplateId)
                ->max('order');

            DB::table('cms_template_fields')->insert([
                'template_id' => $homePageTemplateId,
                'name' => 'Hero Sections',
                'slug' => 'hero-sections',
                'type' => 'component',
                'is_required' => false,
                'order' => ($maxOrder ?? 0) + 1,
                'settings' => json_encode([
                    'component_template_id' => $componentTemplateId,
                    'help_text' => 'Add and manage hero sections for the homepage'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        // Remove the component field from home-page template
        $homePageTemplateId = DB::table('cms_templates')
            ->where('slug', 'home-page')
            ->value('id');

        if ($homePageTemplateId) {
            DB::table('cms_template_fields')
                ->where('template_id', $homePageTemplateId)
                ->where('slug', 'hero-sections')
                ->delete();
        }

        // Remove all fields from hero-section component
        $componentTemplateId = DB::table('cms_templates')
            ->where('slug', 'hero-section')
            ->value('id');

        if ($componentTemplateId) {
            DB::table('cms_template_fields')
                ->where('template_id', $componentTemplateId)
                ->delete();
        }

        // Remove the hero-section component template
        DB::table('cms_templates')
            ->where('slug', 'hero-section')
            ->delete();
    }
};
