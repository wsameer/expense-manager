<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountStatController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseCategoryTotalController;
use App\Http\Controllers\ExpenseSubcategoryController;
use App\Http\Controllers\IncomeCategoryController;
use App\Http\Controllers\IncomeCategoryTotalController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/auth/logout', [AuthController::class, 'logout']);

  Route::apiResource('accounts', AccountController::class);

  Route::get('expense-categories/totals', ExpenseCategoryTotalController::class)
    ->name('expense-categories.totals');

  Route::apiResource('expense-categories', ExpenseCategoryController::class);

  Route::apiResource('expense-categories.subcategories', ExpenseSubcategoryController::class);

  Route::delete('transactions/all', [TransactionController::class, 'destroyAll'])->name('transactions.destroyAll');
  Route::apiResource('transactions', TransactionController::class);

  Route::get('/accounts-stats', [AccountStatController::class, 'index'])->name('accountstat.index');

  Route::get('income-categories/totals', IncomeCategoryTotalController::class)
    ->name('income-categories.totals');

  Route::apiResource('income-categories', IncomeCategoryController::class);
});
