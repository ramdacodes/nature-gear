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
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user');
            $table->foreign('user')->on('users')->references('id')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('payment_method')->nullable();
            $table->foreign('payment_method')->on('paymentmethods')->references('id')->onDelete('set null')->onUpdate('cascade');
            $table->enum('status',['pending','confirm','ready_for_pickup','picked_up','canceled','refunded']);
            $table->enum('payment_status',['paid','unpaid'])->default('unpaid');
            $table->bigInteger('total');
            $table->date('start_date');
            $table->date('end_date');            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
