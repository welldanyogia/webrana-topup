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
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->string('email');
            $table->string('password');
            $table->string('profile');
            $table->string('pin');
            $table->json('details')->nullable();
            $table->integer('duration')->default(30);
            $table->boolean('sold')->default(false);

            // Foreign key relasi ke products
            $table->unsignedBigInteger('product_id')->nullable()->constrained('products')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
