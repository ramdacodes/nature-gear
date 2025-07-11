<?php

use App\Http\Controllers\Transaction\RentalController;
use App\Http\Controllers\Transaction\ReturnController;
use Illuminate\Support\Facades\Route;

Route::prefix('transactions')->group(function () {
    Route::prefix('rentals')->controller(RentalController::class)->name('rentals.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::put('/{id}/confirm-payment', 'confirmPayment')->name('confirm-payment');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::delete('/destroy/multiple', 'destroyMultiple')->name('destroy-multiple');
    });

    Route::prefix('returns')->controller(ReturnController::class)->name('returns.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });
});
