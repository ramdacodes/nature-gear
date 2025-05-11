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
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('category')->nullable();
            $table->foreign('category')->on('categories')->references('id')->onDelete('set null')->onUpdate('cascade');
            $table->unsignedBigInteger('variant')->nullable();
            $table->foreign('variant')->on('variants')->references('id')->onDelete('set null')->onUpdate('cascade');
            $table->bigInteger('price_day');
            $table->text('descryption');
            $table->string('pic1');
            $table->string('pic2');
            $table->string('pic3');
            $table->string('pic4');



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
