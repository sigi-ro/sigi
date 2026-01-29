<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateDefaultSectionsForExistingTemplates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create a default "General" section for each existing template
        // and assign all existing fields to it
        DB::table('cms_templates')->orderBy('id')->chunk(100, function ($templates) {
            foreach ($templates as $template) {
                // Check if template already has sections
                $sectionCount = DB::table('cms_template_sections')
                    ->where('template_id', $template->id)
                    ->count();
                    
                if ($sectionCount > 0) {
                    continue;
                }

                // Create default "General" section
                $sectionId = DB::table('cms_template_sections')->insertGetId([
                    'template_id' => $template->id,
                    'name' => 'General',
                    'slug' => 'general',
                    'description' => 'Default section for all fields',
                    'order' => 0,
                    'is_collapsible' => false,
                    'is_collapsed_by_default' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Assign all existing fields to the General section
                DB::table('cms_template_fields')
                    ->where('template_id', $template->id)
                    ->whereNull('section_id')
                    ->update(['section_id' => $sectionId]);
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remove section assignments from fields
        DB::table('cms_template_fields')
            ->whereNotNull('section_id')
            ->update(['section_id' => null]);

        // Delete all default sections
        DB::table('cms_template_sections')
            ->where('slug', 'general')
            ->delete();
    }
}

