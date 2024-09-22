<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Models\ExpenseSubcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseSubcategoryController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Store a newly created sub category resource in storage.
   */
  public function store(Request $request, $categoryId)
  {
    try {
      $user = Auth::user();

      if (!$user) {
        return response()->json(['error' => 'Unauthenticated'], 401);
      }

      $request->validate([
        'name' => 'required|string|max:50',
      ]);

      $category = ExpenseCategory::findOrFail($categoryId);

      if ($category->subcategories()->count() >= 10) {
        return response()->json(['error' => 'Maximum subcategories limit reached'], 422);
      }

      \DB::beginTransaction();

      $subcategory = $category->subcategories()->create([
        'name' => $request->input('name'),
      ]);

      \DB::commit();

      \Log::info('Subcategory created successfully', ['id' => $subcategory->id, 'name' => $subcategory->name]);

      return response()->json($subcategory, 201);
    } catch (\Exception $e) {
      \DB::rollBack();
      \Log::error('Subcategory creation error', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'categoryId' => $categoryId,
        'requestData' => $request->all()
      ]);
      return response()->json(['error' => 'An error occurred while creating the subcategory: ' . $e->getMessage()], 500);
    }
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
  public function update(Request $request, ExpenseCategory $category) {}

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ExpenseCategory $category)
  {
    //
  }
}
