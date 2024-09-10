<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\AccountGroup;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
  /**
   * GET all users
   */
  public function index()
  {
    $user = Auth::user();
    $accounts = $user->accounts;
    return response()->json($accounts);
  }

  /**
   * POST
   * Create a new user
   */
  public function store(Request $request): JsonResponse
  {
    $user = Auth::user();

    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'group' => 'required|string|in:' . implode(',', array_column(AccountGroup::cases(), 'value')),
      'balance' => 'required|numeric',
      'description' => 'nullable|string',
      'payment_account_id' => 'nullable|exists:accounts,id',
    ]);

    if (
      $validatedData['group'] === AccountGroup::CREDIT_CARD->value
      && !$validatedData['payment_account_id']
    ) {
      return response()->json(['error' => 'Credit card accounts must have a payment account.'], 422);
    }

    /** @var \App\Models\User $user **/
    $account = $user->accounts()->create($validatedData);
    return response()->json($account, 201);
  }

  /**
   * GET user by id
   */
  public function show($id): JsonResponse
  {
    $user = Auth::user();
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->findOrFail($id);
    return response()->json($account);
  }

  /**
   * PUT
   * Update existing user
   */
  public function update(Request $request, $id): JsonResponse
  {
    $user = Auth::user();
    /** @var \App\Models\User $user **/
    $account = $user->accounts()->findOrFail($id);

    $validatedData = $request->validate([
      'name' => 'sometimes|required|string|max:255',
      'group' => 'sometimes|required|string|in:' . implode(',', array_column(AccountGroup::cases(), 'value')),
      'balance' => 'sometimes|required|numeric',
      'description' => 'nullable|string',
      'payment_account_id' => 'nullable|exists:accounts,id',
    ]);

    if (
      isset($validatedData['group'])
      && $validatedData['group'] === AccountGroup::CREDIT_CARD->value
      && !isset($validatedData['payment_account_id'])
      && !$account->payment_account_id
    ) {
      return response()->json(
        ['error' => 'Credit card accounts must have a payment account.'],
        422
      );
    }

    $account->update($validatedData);
    return response()->json($account);
  }

  /**
   * DELETE a user
   */
  public function destroy($id): JsonResponse
  {
    try {
      $user = Auth::user();

      /** @var \App\Models\User $user **/
      $account = $user->accounts()->findOrFail($id);

      $account->delete();

      return response()->json(null, 204);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Account not found',
        'message' => 'The requested account does not exist or does not belong to you.'
      ], 404);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred while processing your request.'
      ], 500);
    }
  }
}
