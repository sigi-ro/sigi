<?php

use App\Interfaces\CMS\TemplateFieldInterface;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCmsTemplateSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_template_sections', function (Blueprint $table) {
            // Section Creation
            $table->id();
            $table->unsignedBigInteger('template_id');
            $table->string('name', TemplateFieldInterface::FIELD_NAME_MAX_LENGTH);
            $table->string('slug', TemplateFieldInterface::FIELD_SLUG_MAX_LENGTH);
            $table->text('description')->nullable()->default(null);
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_collapsible')->default(true);
            $table->boolean('is_collapsed_by_default')->default(false);
            $table->timestamps();
            $table->softDeletes();

            // Index Creation
            $table->foreign('template_id')
                ->references('id')
                ->on('cms_templates')
                ->onDelete('cascade');
            $table->index('template_id');
            $table->index('order');
            $table->unique(['template_id', 'slug'], 'unique_template_section_slug');
            $table->index(['template_id', 'order'], 'idx_template_section_order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cms_template_sections');
    }
}

