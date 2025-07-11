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
        Schema::table('rentals', function (Blueprint $table) {
            $table->enum('status', ['pending', 'completed', 'ready_for_pickup', 'picked_up', 'canceled', 'refunded'])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rentals', function (Blueprint $table) {
            $table->enum('status', ['pending', 'confirm', 'ready_for_pickup', 'picked_up', 'canceled', 'refunded']);
        });
    }
};
