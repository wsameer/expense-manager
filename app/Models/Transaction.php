<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'expense_category_id',
    'income_category_id',
    'account_id',
    'amount',
    'transaction_date',
    'description',
    'type'
  ];

  protected $casts = [
    'transaction_date' => 'date',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function expenseCategory()
  {
    return $this->belongsTo(ExpenseCategory::class);
  }

  public function incomeCategory()
  {
    return $this->belongsTo(IncomeCategoryModel::class);
  }

  public function account()
  {
    return $this->belongsTo(Account::class);
  }

  public function category()
  {
    return $this->type === 'expense'
      ? $this->expenseCategory()
      : $this->incomeCategory();
  }

  public function scopeExpenses($query)
  {
    return $query->where('type', 'expense');
  }

  public function scopeIncomes($query)
  {
    return $query->where('type', 'income');
  }
}
