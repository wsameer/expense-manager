<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class IncomeCategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $categories = $request->user()->incomeCategories()->get();
    return response()->json($categories);
  }

  /**
   * Create a new Income Category
   * 
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:50',
      'description' => 'nullable|string',
    ]);

    $category = $request->user()->incomeCategories()->create($request->all());
    return response()->json($category, 201);
  }

  /**
   * GET income category details by id
   */
  public function show(Request $request, $id)
  {
    try {
      $category = $request->user()->incomeCategories()
        ->findOrFail($id);

      // TODO
      // if (!auth()->user()->can('view', $category)) {
      //   return response()->json(['error' => 'Unauthorized'], 403);
      // }

      return response()->json(['data' => $category]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['error' => 'Income category not found'], 404);
    } catch (\Exception $e) {
      Log::error('Error retrieving income category: ' . $e->getMessage());
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An error occurred while retrieving the income category'
      ], 500);
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    try {
      // User Ownership
      $category = $request->user()->incomeCategories()->findOrFail($id);

      // Authorization
      // $this->authorize('update', $category);

      // Validation of data
      $validatedData = $request->validate([
        'name' => 'required|string|max:50',
        'description' => 'nullable|string',
      ]);

      // TODO Update
      $category->update($validatedData);

      return response()->json([
        'message' => 'Income category updated successfully',
        'category' => $category
      ]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['error' => 'Income category not found'], 404);
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
   * Remove an income category by id
   */
  public function destroy(Request $request, int $incomeId): JsonResponse
  {
    try {
      $category = $request->user()->incomeCategories()->findOrFail($incomeId);

      $category->delete();

      return response()->json(null, 204);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Income category not found',
        'message' => 'The requested income category does not exist or does not belong to you.'
      ], 404);
    } catch (\Exception $e) {
      Log::error('Error deleting income category: ' . $e->getMessage());
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred while processing your request.'
      ], 500);
    }
  }
}
