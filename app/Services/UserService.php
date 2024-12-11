<?php

namespace App\Services;

use App\Models\User;

class UserService
{
  public function createUser(array $userData)
  {
    $user = User::create($userData);

    $this->createDefaultCashAccount($user);

    return $user;
  }

  private function createDefaultCashAccount(User $user)
  {
    return $user->accounts()->create([
      'name' => 'Cash',
      'group' => 'CASH',
      'balance' => '0.00',
      'description' => 'Default cash account',
      'payment_account_id' => null,
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
