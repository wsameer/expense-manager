<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ExpenseSubcategoryController extends Controller
{

  /**
   * Store a newly created sub category resource in storage.
   */
  public function store(Request $request, $categoryId)
  {
    try {

      // User Ownership
      $category = $request->user()->expenseCategories()->findOrFail($categoryId);

      // TODO Authorization
      // $this->authorize('update', $category);

      // Validation of request data
      $request->validate([
        'name' => 'required|string|max:50',
      ]);

      // Validation check for paywall 
      if ($category->subcategories()->count() >= 10) {
        return response()->json(['error' => 'Maximum subcategories limit reached'], 422);
      }

      \DB::beginTransaction();

      // create
      $subcategory = $category->subcategories()->create([
        'name' => $request->input('name'),
      ]);

      \DB::commit();

      \Log::info('Subcategory created successfully', [
        'id' => $subcategory->id,
        'name' => $subcategory->name
      ]);

      return response()->json($subcategory, 201);
    } catch (\Exception $e) {
      \DB::rollBack();
      \Log::error('Subcategory creation error', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'categoryId' => $categoryId,
        'requestData' => $request->all()
      ]);

      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An error occurred while creating the subcategory: ' . $e->getMessage()
      ], 500);
    }
  }

  /**
   * Update the specified subcategory.
   *
   * @param Request $request
   * @param int $categoryId
   * @param int $subcategoryId
   * @return JsonResponse
   */
  public function update(Request $request, $categoryId, $subcategoryId): JsonResponse
  {
    try {
      $subCategory = $request->user()->expenseCategories()
        ->findOrFail($categoryId)
        ->subcategories()
        ->findOrFail($subcategoryId);

      // TODO
      // $this->authorize('update', $subCategory);

      $validatedData = $request->validate([
        'name' => 'required|string|max:50',
      ]);

      $subCategory->update($validatedData);

      return response()->json([
        'message' => 'Subcategory updated successfully',
        'subcategory' => $subCategory
      ]);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Subcategory or category not found'
      ], 404);
    } catch (AuthorizationException $e) {
      return response()->json([
        'error' => 'You are not authorized to update this subcategory'
      ], 403);
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
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, $categoryId, $subcategoryId)
  {
    try {
      return \DB::transaction(function () use ($request, $categoryId, $subcategoryId) {

        // User Ownership
        $category = $request->user()->expenseCategories()->findOrFail($categoryId);

        // Subcategory ownership and existence
        $subCategory = $category->subcategories()->findOrFail($subcategoryId);

        // TODO
        // if (!auth()->user()->can('delete', $subCategory)) {
        //   return response()->json(['error' => 'Unauthorized'], 403);
        // }

        // Delete
        $subCategory->delete();

        return response()->json([
          'message' => 'Subcategory deleted successfully'
        ], 200);
      });
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => 'Category or Subcategory not found'
      ], 404);
    } catch (\Exception $e) {
      \Log::error('Error deleting subcategory: ' . $e->getMessage());
      return response()->json([
        'error' => 'Internal Server Error',
        'message' => 'An error occurred while deleting the subcategory'
      ], 500);
    }
  }
}
