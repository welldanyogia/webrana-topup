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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('trx_id')->primary();
            $table->string('buyer_id')->nullable();
            $table->string('user_id')->nullable();
            $table->string('server_id')->nullable();
            $table->string('user_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->string('buyer_sku_code');
            $table->string('product_brand');
            $table->string('product_name');
            $table->integer('amount');
            $table->enum('status', ['pending', 'process', 'failed', 'success'])->default('pending');
            $table->string('payment_method');
            $table->string('payment_name');
            $table->string('no_va')->nullable();
            $table->string('no_rekening')->nullable();
            $table->enum('payment_status',['PAID','FAILED','EXPIRED','REFUND','UNPAID'])->default('unpaid');
            $table->timestamp('expired_time');
            $table->string('qr_url')->nullable();
            $table->string('qr_string')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
