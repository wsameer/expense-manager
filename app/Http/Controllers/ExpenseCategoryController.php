<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseCategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $user = Auth::user();

    if (!$user) {
      return response()->json(['error' => 'Unauthenticated'], 401);
    }

    /** @var \App\Models\User $user **/
    $categories = $user->expenseCategories()->with('subcategories')->get();

    return response()->json($categories);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:50',
    ]);

    $category = auth()->user()->expenseCategories()->create($request->all());
    return response()->json($category, 201);
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
  public function update(Request $request, ExpenseCategory $category)
  {
    $this->authorize('update', $category);

    $request->validate([
      'name' => 'required|string|max:50'
    ]);

    $category->update($request->all());
    return response()->json($category);
  }

  /**
   * DELETE an account
   */
  public function destroy($categoryId): JsonResponse
  {
    try {
      $user = Auth::user();

      if (!$user) {
        return response()->json(['error' => 'Unauthenticated'], 401);
      }

      /** @var \App\Models\User $user **/
      $category = $user->expenseCategories()->findOrFail($categoryId);
      $category->delete();

      return response()->json(null, 204);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Expense category not found',
        'message' => 'The requested expense category does not exist or does not belong to you.'
      ], 404);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred while processing your request.'
      ], 500);
    }
  }
}
