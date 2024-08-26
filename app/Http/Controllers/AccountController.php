<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\AccountType;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    $accounts = $user->accounts;
    return response()->json($accounts);
  }

  public function store(Request $request)
  {
    $user = Auth::user();

    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'type' => 'required|string|in:' . implode(',', array_column(AccountType::cases(), 'value')),
      'balance' => 'required|numeric',
      'description' => 'nullable|string',
      'payment_account_id' => 'nullable|exists:accounts,id',
    ]);

    if ($validatedData['type'] === AccountType::CREDIT_CARD->value && !$validatedData['payment_account_id']) {
      return response()->json(['error' => 'Credit card accounts must have a payment account.'], 422);
    }
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->create($validatedData);
    return response()->json($account, 201);
  }

  public function show($id)
  {
    $user = Auth::user();
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->findOrFail($id);
    return response()->json($account);
  }

  public function update(Request $request, $id)
  {
    $user = Auth::user();
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->findOrFail($id);

    $validatedData = $request->validate([
      'name' => 'sometimes|required|string|max:255',
      'type' => 'sometimes|required|string|in:' . implode(',', array_column(AccountType::cases(), 'value')),
      'balance' => 'sometimes|required|numeric',
      'description' => 'nullable|string',
      'payment_account_id' => 'nullable|exists:accounts,id',
    ]);

    if (isset($validatedData['type']) && $validatedData['type'] === AccountType::CREDIT_CARD->value && !isset($validatedData['payment_account_id']) && !$account->payment_account_id) {
      return response()->json(['error' => 'Credit card accounts must have a payment account.'], 422);
    }

    $account->update($validatedData);
    return response()->json($account);
  }

  public function destroy($id)
  {
    $user = Auth::user();
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->findOrFail($id);
    $account->delete();
    return response()->json(null, 204);
  }
}
