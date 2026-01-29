<?php

declare(strict_types=1);

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
        Schema::table('tenants', function (Blueprint $table) {
            // Storage quota tracking columns
            $table->unsignedBigInteger('storage_used_bytes')->default(0)->after('modules');
            $table->unsignedBigInteger('storage_limit_bytes')->default(1073741824)->after('storage_used_bytes'); // Default 1GB
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['storage_used_bytes', 'storage_limit_bytes']);
        });
    }
};
