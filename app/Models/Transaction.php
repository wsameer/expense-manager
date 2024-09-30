<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'type',
    'date',
    'amount',
    'from_account_id',
    'to_account_id',
    'expense_category_id',
    'expense_subcategory_id',
    'income_category_id',
    'note',
  ];

  protected $with = ['expenseCategory', 'expenseSubcategory', 'incomeCategory'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function fromAccount()
  {
    return $this->belongsTo(Account::class, 'from_account_id');
  }

  public function toAccount()
  {
    return $this->belongsTo(Account::class, 'to_account_id');
  }

  public function expenseCategory()
  {
    return $this->belongsTo(ExpenseCategory::class);
  }

  public function expenseSubcategory()
  {
    return $this->belongsTo(ExpenseSubcategory::class);
  }

  public function incomeCategory()
  {
    return $this->belongsTo(IncomeCategoryModel::class);
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
