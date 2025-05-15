<?php

use App\Http\Controllers\User\CustomerController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::prefix('customers')->controller(CustomerController::class)->name('customers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::delete('/destroy/multiple', 'destroyMultiple')->name('destroy-multiple');
    });
});
