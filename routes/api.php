<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountStatController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/auth/logout', [AuthController::class, 'logout']);

  // This single line of code is equivalent to writing out all of these routes individually:
  Route::apiResource('accounts', AccountController::class);

  Route::get('/accounts-stats', [AccountStatController::class, 'index'])->name('accountstat.index');
});
