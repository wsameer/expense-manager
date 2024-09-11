<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultExpenseCategoriesSeeder extends Seeder
{
  public function run()
  {
    $defaultCategories = [
      'Food',
      'Groceries',
      'Utilities',
      'Shopping',
      'Health',
      'House',
      'Transport',
      'Travel',
      'Other'
    ];

    User::all()->each(function ($user) use ($defaultCategories) {
      foreach ($defaultCategories as $category) {
        ExpenseCategory::create([
          'user_id' => $user->id,
          'name' => $category,
          'is_default' => true
        ]);
      }
    });
  }
}
