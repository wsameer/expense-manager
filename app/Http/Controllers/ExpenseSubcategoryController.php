<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

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
   * Store a newly created resource in storage.
   */
  public function store(Request $request, ExpenseCategory $category)
  {
    $this->authorize('update', $category);

    $request->validate([
      'name' => 'required|string|max:255',
    ]);

    if ($category->subcategories()->count() >= 10) {
      return response()->json(['error' => 'Maximum subcategories limit reached'], 422);
    }

    $subcategory = $category->subcategories()->create($request->all());
    return response()->json($subcategory, 201);
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
