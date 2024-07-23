<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});


Route::get('/{any}', function () {
    return Inertia::render('Welcome');
});


require __DIR__.'/auth.php';
