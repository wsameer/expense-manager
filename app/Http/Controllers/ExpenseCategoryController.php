<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ExpenseCategoryController extends Controller
{
  /**
   * GET all categories and subcategories for a user
   * 
   * @param Request $request
   */
  public function index(Request $request)
  {
    $categories = $request->user()->expenseCategories()->with('subcategories')->get();
    return response()->json($categories);
  }

  /**
   * Create a new Expense Category
   * 
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:50',
    ]);

    $category = $request->user()->expenseCategories()->create($request->all());
    return response()->json($category, 201);
  }

  /**
   * Display the specified expense category.
   * 
   * @param Request $request
   * @param int $categoryId
   * @return JsonResponse
   */
  public function show(Request $request, int $categoryId): JsonResponse
  {
    try {
      $category = $request->user()->expenseCategories()
        ->with('subcategories')
        ->findOrFail($categoryId);

      // TODO
      // if (!auth()->user()->can('view', $category)) {
      //   return response()->json(['error' => 'Unauthorized'], 403);
      // }

      return response()->json(['data' => $category]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['error' => 'Expense category not found'], 404);
    } catch (\Exception $e) {
      Log::error('Error retrieving expense category: ' . $e->getMessage());
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An error occurred while retrieving the expense category'
      ], 500);
    }
  }

  /**
   * Update the specified resource in storage.
   * 
   * @param Request $request
   * @param int $id
   * @return JsonResponse
   */
  public function update(Request $request, int $id)
  {
    try {
      // User Ownership
      $category = $request->user()->expenseCategories()->findOrFail($id);

      // Authorization
      // $this->authorize('update', $category);

      // Validation of data
      $validatedData = $request->validate([
        'name' => 'required|string|max:50',
      ]);

      // TODO Update
      $category->update($validatedData);

      return response()->json([
        'message' => 'Expense category updated successfully',
        'category' => $category
      ]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['error' => 'Expense category not found'], 404);
    } catch (AuthorizationException $e) {
      return response()->json(['error' => 'You are not authorized to update this category'], 403);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred'
      ], 500);
    }
  }

  /**
   * DELETE an expense category
   * 
   * @param Request $request
   * @param int $id
   * @return JsonResponse
   */
  public function destroy(Request $request, int $categoryId): JsonResponse
  {
    try {
      $category = $request->user()->expenseCategories()->findOrFail($categoryId);

      $category->delete();

      return response()->json(null, 204);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Expense category not found',
        'message' => 'The requested expense category does not exist or does not belong to you.'
      ], 404);
    } catch (\Exception $e) {
      Log::error('Error deleting expense category: ' . $e->getMessage());
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred while processing your request.'
      ], 500);
    }
  }
}
