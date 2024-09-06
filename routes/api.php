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
  // Route::get('/accounts', [AccountController::class, 'index'])->name('accounts.index');
  // Route::post('/accounts', [AccountController::class, 'store'])->name('accounts.store');
  // Route::get('/accounts/{account}', [AccountController::class, 'show'])->name('accounts.show');
  // Route::put('/accounts/{account}', [AccountController::class, 'update'])->name('accounts.update');
  // Route::delete('/accounts/{account}', [AccountController::class, 'destroy'])->name('accounts.destroy');

  Route::get('/accounts-stats', [AccountStatController::class, 'index'])->name('accountstat.index');
});
