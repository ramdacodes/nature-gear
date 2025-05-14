<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('web/index');
})->name('home');

Route::get('/rent', function () {
    return Inertia::render('web/page/rent/index');
})->name('rent');

Route::get('/about', function () {
    return Inertia::render('web/page/about/index');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('web/page/contact/index');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/xendit.php';
