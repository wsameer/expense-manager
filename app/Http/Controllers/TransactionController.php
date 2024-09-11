<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $transactions = auth()->user()->transactions()->with(['expenseCategory', 'account'])->get();
    return response()->json($transactions);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'expense_category_id' => 'required|exists:expense_categories,id',
      'account_id' => 'required|exists:accounts,id',
      'amount' => 'required|numeric',
      'transaction_date' => 'required|date',
      'description' => 'nullable|string',
    ]);

    $transaction = auth()->user()->transactions()->create($request->all());
    return response()->json($transaction, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
