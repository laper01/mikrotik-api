<?php

use App\Http\Controllers\Api\LoginApiController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/login', [LoginApiController::class, 'login']);



Route::middleware('auth:sanctum')->group(function(){
    Route::post('/ubah-password', [UserController::class, 'updatePassword']);
    Route::post('/import', [UserController::class, 'import']);
    Route::post('/logout',[LoginApiController::class, 'logout'] );
});
