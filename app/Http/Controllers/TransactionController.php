<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $this->authorize('viewAny', Transaction::class);
    $transactions = auth()->user()->transactions()->with([
      'fromAccount',
      'toAccount',
      'expenseCategory',
      'expenseSubcategory',
      'incomeCategory'
    ])->latest()->get();

    return response()->json($transactions);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'type' => 'required|in:bank_to_bank,income,expense',
      'date' => 'required|date',
      'amount' => 'required|numeric|min:0.01',
      'from_account_id' => 'required|exists:accounts,id',
      'to_account_id' => 'required_if:type,bank_to_bank|exists:accounts,id',
      'expense_category_id' => [
        Rule::requiredIf(function () use ($request) {
          return $request->input('type') === 'expense';
        }),
        'exists:expense_categories,id',
      ],
      'expense_subcategory_id' => [
        'nullable',
        Rule::exists('expense_subcategories', 'id')->where(function ($query) use ($request) {
          $query->where('expense_category_id', $request->input('expense_category_id'));
        }),
      ],
      'income_category_id' => [
        Rule::requiredIf(function () use ($request) {
          return $request->input('type') === 'income';
        }),
        'exists:income_categories,id',
      ],
      'note' => 'nullable|string',
    ]);

    return \DB::transaction(function () use ($validated, $request) {
      $transaction = auth()->user()->transactions()->create($validated);

      $fromAccount = Account::findOrFail($validated['from_account_id']);

      switch ($validated['type']) {
        case 'bank_to_bank':
          $toAccount = Account::findOrFail($validated['to_account_id']);
          $fromAccount->decrement('balance', $validated['amount']);
          $toAccount->increment('balance', $validated['amount']);
          break;
        case 'income':
          $fromAccount->increment('balance', $validated['amount']);
          break;
        case 'expense':
          $fromAccount->decrement('balance', $validated['amount']);
          break;
      }

      return response()->json(
        $transaction->load([
          'fromAccount',
          'toAccount',
          'expenseCategory',
          'expenseSubcategory',
          'incomeCategory'
        ]),
        201
      );
    });
  }

  /**
   * Display the specified resource.
   */
  public function show(Transaction $transaction)
  {
    $this->authorize('view', $transaction);
    return response()->json($transaction->load([
      'fromAccount',
      'toAccount',
      'expenseCategory',
      'expenseSubcategory',
      'incomeCategory'
    ]));
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
