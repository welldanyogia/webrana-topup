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
        Schema::create('brands', function (Blueprint $table) {
            $table->uuid('brand_id');
            $table->string('brand_name');
            $table->string('image_url')->nullable();
            $table->boolean('brand_status');
            $table->enum('processed_by', ['manual', 'digiflazz'])->default('digiflazz');
            // Ensure that the foreign key references the correct column name
            $table->uuid('category_id')->constrained('categories')->references('category_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
