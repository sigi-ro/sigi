<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cms_pages', function (Blueprint $table) {
            $table->string('preview_token', 64)->nullable()->after('slug');
            $table->timestamp('preview_token_expires_at')->nullable()->after('preview_token');
            
            $table->index('preview_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cms_pages', function (Blueprint $table) {
            $table->dropIndex(['preview_token']);
            $table->dropColumn(['preview_token', 'preview_token_expires_at']);
        });
    }
};
