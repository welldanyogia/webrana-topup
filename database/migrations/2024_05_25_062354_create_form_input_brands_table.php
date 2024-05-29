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
        Schema::create('form_input_brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type',['number','text','select']);
            $table->uuid('brand_id')->constrained('brands')->references('brand_id')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_input_brands');
    }
};
