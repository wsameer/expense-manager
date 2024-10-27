<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class WipeUserData extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'user:wipe {userId : The ID of the user to wipe}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Wipe all records associated with a specific user from the expenses manager database';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $userId = $this->argument('userId');

    $user = User::find($userId);
    if (!$user) {
      $this->error("User with ID {$userId} does not exist!");
      return 1;
    }

    try {
      \DB::beginTransaction();

      \DB::table('users')->where('id', $userId)->delete();
      \DB::table('transactions')->where('user_id', $userId)->delete();
      \DB::table('accounts')->where('user_id', $userId)->delete();
      \DB::table('income_categories')->where('user_id', $userId)->delete();
      \DB::table('expense_categories')->where('user_id', $userId)->delete();
      \DB::table('expense_subcategories')->whereIn('expense_category_id', function ($query) use ($userId) {
        $query->select('id')
          ->from('expense_categories')
          ->where('user_id', $userId);
      })->delete();

      \DB::commit();

      $this->info("Successfully wiped all data for user {$user->name} (ID: {$userId})");
      return 0;
    } catch (\Exception $e) {
      \DB::rollBack();
      $this->error("An error occurred while wiping user data: " . $e->getMessage());
      return 1;
    }
  }
}
