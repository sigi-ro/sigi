<?php

use App\Interfaces\EDU\Course\CoursePurchaseInterface;
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
        Schema::create('edu_course_refunds', function (Blueprint $table) {
            $table->id();
            $table->string('course_name');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('course_purchase_id');
            $table->unsignedBigInteger('user_id');
            $table->string('status'); // PENDING | REFUNDED | FAILED | NOT_DUE | OVERDUE
            $table->string('reason');
            $table->longText('reason_message');
            $table->longText('notes');


            $table->timestamps();

            // Indexes
            $table->foreign('course_purchase_id')
                ->references('id')
                ->on('edu_course_purchases');

            // Indexes
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edu_course_refunds');
    }
};
