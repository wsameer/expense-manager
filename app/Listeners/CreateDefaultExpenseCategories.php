<?php

namespace App\Listeners;

use App\Models\ExpenseCategory;
use Illuminate\Auth\Events\Registered;

class CreateDefaultExpenseCategories
{
  /**
   * Create the event listener.
   */
  public function __construct()
  {
    //
  }

  /**
   * Handle the event.
   */
  public function handle(Registered $event)
  {
    $user = $event->user;
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

    foreach ($defaultCategories as $category) {
      ExpenseCategory::create([
        'user_id' => $user->id,
        'name' => $category,
        'is_default' => true,
      ]);
    }
  }
}
