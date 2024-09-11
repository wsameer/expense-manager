<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
  use HasFactory;

  protected $fillable = ['user_id', 'expense_category_id', 'account_id', 'amount', 'transaction_date', 'description'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function expenseCategory()
  {
    return $this->belongsTo(ExpenseCategory::class);
  }

  public function bankAccount()
  {
    return $this->belongsTo(Account::class);
  }
}
