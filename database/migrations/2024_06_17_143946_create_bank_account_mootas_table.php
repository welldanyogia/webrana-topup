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
        Schema::create('bank_account_mootas', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('atas_nama');
            $table->decimal('balance', 15, 2)->default(0.00);
            $table->string('account_number');
            $table->string('bank_type');
            $table->integer('login_retry')->default(0);
            $table->timestamp('date_from')->nullable();
            $table->timestamp('date_to')->nullable();
            $table->json('meta')->nullable();
            $table->integer('interval_refresh')->default(15);
            $table->timestamp('next_queue')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('in_queue')->default(0);
            $table->integer('in_progress')->default(0);
            $table->boolean('is_big')->default(false);
            $table->boolean('is_auto_start')->default(true);
            $table->timestamp('recurred_at')->nullable();
            $table->string('status')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamp('ip_address_expired_at')->nullable();
            $table->string('token');
            $table->string('bank_id');
            $table->string('label');
            $table->timestamp('last_update')->nullable();
            $table->string('icon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_account_mootas');
    }
};
