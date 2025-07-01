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
        Schema::table('accounts', function (Blueprint $table) {
            //
            $table->integer('duration_left')->after('duration')->nullable();
            $table->uuid('trx_id')->nullable()->constrained('transactions')->references('trx_id')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->dropColumn('duration_left');
//            $table->dropForeign(['category_id']);
            $table->dropColumn('trx_id');
        });
    }
};
