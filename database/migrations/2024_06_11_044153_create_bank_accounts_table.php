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
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('bank');
            $table->string('module');
            $table->string('account_no');
            $table->string('account_name');
            $table->integer('balance'); // Assuming balance can be a large number with two decimal places
            $table->timestamp('last_bot_activity')->nullable();
            $table->timestamp('next_bot_process')->nullable();
            $table->string('url_callback')->nullable();
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
