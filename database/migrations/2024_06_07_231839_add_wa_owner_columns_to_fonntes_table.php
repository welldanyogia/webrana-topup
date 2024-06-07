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
        Schema::table('fonntes', function (Blueprint $table) {
            $table->string('wa_owner')->nullable()->after('acc_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fonntes', function (Blueprint $table) {
            $table->dropColumn('wa_owner');
        });
    }
};
