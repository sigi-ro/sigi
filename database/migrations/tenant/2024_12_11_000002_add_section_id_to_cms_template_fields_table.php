<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSectionIdToCmsTemplateFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cms_template_fields', function (Blueprint $table) {
            $table->unsignedBigInteger('section_id')->nullable()->after('template_id');
            
            $table->foreign('section_id')
                ->references('id')
                ->on('cms_template_sections')
                ->onDelete('set null');
                
            $table->index('section_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cms_template_fields', function (Blueprint $table) {
            $table->dropForeign(['section_id']);
            $table->dropIndex(['section_id']);
            $table->dropColumn('section_id');
        });
    }
}

