<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpenseCategoryTotalController extends Controller
{
  public function __invoke(Request $request)
  {
    $validated = $request->validate([
      'month' => 'required|date_format:Y-m'
    ]);

    // Parse the month
    $date = Carbon::createFromFormat('Y-m', $validated['month']);

    // Query to get expense categories total
    $expenseCategoriesTotal = Transaction::without(['expenseCategory', 'expenseSubcategory', 'incomeCategory'])
      ->where('type', 'expense')
      ->whereYear('date', $date->year)
      ->whereMonth('date', $date->month)
      ->join('expense_categories', 'transactions.expense_category_id', '=', 'expense_categories.id')
      ->groupBy('expense_categories.id', 'expense_categories.name')
      ->select(
        'expense_categories.id',
        'expense_categories.name as category',
        \DB::raw('SUM(transactions.amount) as total_amount')
      )
      ->get();

    return response()->json($expenseCategoriesTotal);
  }
}
