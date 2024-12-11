<?php

namespace App\Listeners;

use App\Models\IncomeCategoryModel;
use Illuminate\Auth\Events\Registered;

class CreateDefaultIncomeCategories
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
  public function handle(Registered $event): void
  {
    $user = $event->user;

    $defaultCategories = [
      'Salary',
      'Freelance',
      'Investments',
      'Side Hustle',
      'Rental Income',
      'Bank Interest',
      'Refund'
    ];

    try {
      foreach ($defaultCategories as $category) {
        IncomeCategoryModel::create([
          'user_id' => $user->id,
          'name' => $category
        ]);
      }
    } catch (\Exception $e) {
      \Log::error('Category creation error: ' . $e->getMessage());
      throw $e;
    }
  }
};
