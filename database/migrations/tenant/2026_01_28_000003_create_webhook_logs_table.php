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
        Schema::create('webhook_logs', function (Blueprint $table) {
            $table->id();
            $table->string('event_type', 50);
            $table->string('endpoint_url', 500);
            $table->string('endpoint_name', 120)->nullable();
            $table->string('status', 20); // pending, success, failed
            $table->unsignedSmallInteger('http_status')->nullable();
            $table->text('request_payload');
            $table->text('response_body')->nullable();
            $table->text('error_message')->nullable();
            $table->unsignedTinyInteger('attempt_number')->default(1);
            $table->unsignedInteger('duration_ms')->nullable();
            $table->timestamps();

            $table->index(['event_type', 'created_at']);
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webhook_logs');
    }
};
