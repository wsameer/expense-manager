<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IncomeCategoryTotalController extends Controller
{
  public function __invoke(Request $request)
  {
    $validated = $request->validate([
      'month' => 'required|date_format:Y-m'
    ]);

    // Parse the month
    $date = Carbon::createFromFormat('Y-m', $validated['month']);

    // Query to get income categories total
    $incomeCategoriesTotal = Transaction::without(['incomeCategory', 'incomeSubcategory', 'incomeCategory'])
      ->where('type', 'income')
      ->whereYear('date', $date->year)
      ->whereMonth('date', $date->month)
      ->join('income_categories', 'transactions.income_category_id', '=', 'income_categories.id')
      ->groupBy('income_categories.id', 'income_categories.name')
      ->select(
        'income_categories.id',
        'income_categories.name as category',
        \DB::raw('SUM(transactions.amount) as total_amount')
      )
      ->get();

    return response()->json($incomeCategoriesTotal);
  }
}
