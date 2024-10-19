<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $request->validate([
      'month' => 'sometimes|required|date_format:Y-m',
    ]);

    $this->authorize('viewAny', Transaction::class);

    $query = auth()->user()->transactions()->with([
      'fromAccount',
      'toAccount',
      'expenseCategory',
      'expenseSubcategory',
      'incomeCategory'
    ]);

    if ($request->has('month')) {
      $date = Carbon::createFromFormat('Y-m', $request->month);
      $query->whereYear('date', $date->year)
        ->whereMonth('date', $date->month);
    }

    $transactions = $query->latest()->get();

    return response()->json($transactions);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'type' => 'required|in:bank_to_bank,income,expense',
      'date' => 'required|date_format:Y-m-d H:i:s',
      'amount' => 'required|numeric|min:0.01',
      'from_account_id' => 'required|exists:accounts,id',
      'to_account_id' => 'required_if:type,bank_to_bank|exists:accounts,id',
      'expense_category_id' => [
        Rule::requiredIf(fn() => $request->input('type') === 'expense'),
        'exists:expense_categories,id',
      ],
      'expense_subcategory_id' => [
        'nullable',
        Rule::exists('expense_subcategories', 'id')->where(function ($query) use ($request) {
          $query->where('expense_category_id', $request->input('expense_category_id'));
        }),
      ],
      'income_category_id' => [
        Rule::requiredIf(fn() => $request->input('type') === 'income'),
        'exists:income_categories,id',
      ],
      'note' => 'nullable|string',
    ]);

    // Convert the date string to a Carbon instance
    $validated['date'] = Carbon::parse($validated['date']);

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
  public function update(Request $request, Transaction $transaction)
  {
    $this->authorize('update', $transaction);

    $validated = $request->validate([
      'date' => 'sometimes|required|date',
      'amount' => 'sometimes|required|numeric|min:0.01',
      'from_account_id' => 'required|exists:accounts,id',
      'to_account_id' => 'required_if:type,bank_to_bank|exists:accounts,id',
      'expense_category_id' => [
        Rule::requiredIf(function () use ($transaction) {
          return $transaction->type === 'expense';
        }),
        'exists:expense_categories,id',
      ],
      'expense_subcategory_id' => [
        'nullable',
        Rule::requiredIf(function () use ($transaction, $request) {
          return $transaction->type === 'expense' && $request->has('expense_category_id');
        }),
        'exists:expense_subcategories,id',
      ],
      'income_category_id' => [
        Rule::requiredIf(function () use ($transaction) {
          return $transaction->type === 'income';
        }),
        'exists:income_categories,id',
      ],
      'note' => 'nullable|string',
    ]);

    return DB::transaction(function () use ($validated, $transaction) {
      $oldAmount = $transaction->amount;
      $newAmount = $validated['amount'] ?? $oldAmount;

      $transaction->update($validated);

      if ($oldAmount !== $newAmount) {
        switch ($transaction->type) {
          case 'bank_to_bank':
            $transaction->fromAccount->increment('balance', $oldAmount);
            $transaction->fromAccount->decrement('balance', $newAmount);
            $transaction->toAccount->decrement('balance', $oldAmount);
            $transaction->toAccount->increment('balance', $newAmount);
            break;
          case 'income':
            $transaction->fromAccount->decrement('balance', $oldAmount);
            $transaction->fromAccount->increment('balance', $newAmount);
            break;
          case 'expense':
            $transaction->fromAccount->increment('balance', $oldAmount);
            $transaction->fromAccount->decrement('balance', $newAmount);
            break;
        }
      }

      return response()->json($transaction->fresh()->load([
        'fromAccount',
        'toAccount',
        'expenseCategory',
        'expenseSubcategory',
        'incomeCategory'
      ]));
    });
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Transaction $transaction)
  {
    $this->authorize('delete', $transaction);

    return \DB::transaction(function () use ($transaction) {
      switch ($transaction->type) {
        case 'bank_to_bank':
          $transaction->fromAccount->increment('balance', $transaction->amount);
          $transaction->toAccount->decrement('balance', $transaction->amount);
          break;
        case 'income':
          $transaction->fromAccount->decrement('balance', $transaction->amount);
          break;
        case 'expense':
          $transaction->fromAccount->increment('balance', $transaction->amount);
          break;
      }

      $transaction->delete();

      return response()->json(null, 204);
    });
  }
}
