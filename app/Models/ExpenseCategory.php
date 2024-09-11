<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
  use HasFactory;

  protected $fillable = ['user_id', 'name', 'is_default'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function subCategories()
  {
    return $this->belongsTo(ExpenseSubcategory::class);
  }

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
