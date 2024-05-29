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
        Schema::create('products', function (Blueprint $table) {
            $table->id('id');
            $table->string('product_name');
            $table->uuid('brand_id')->constrained('brands')->references('brand_id')->onDelete('cascade');
            $table->uuid('type_id')->constrained('types')->references('type_id')->onDelete('cascade');
            $table->string('seller_name');
            $table->string('price');
            $table->string('buyer_sku_code');
            $table->boolean('product_status')->nullable(true);
            $table->boolean('buyer_product_status');
            $table->boolean('seller_product_status');
            $table->boolean('unlimited_stock');
            $table->string('stock');
            $table->boolean('multi');
            $table->string('start_cut_off');
            $table->string('end_cut_off');
            $table->text('desc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
