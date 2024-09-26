<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeCategoryModel extends Model
{
  use HasFactory;

  protected $table = 'income_categories';
  protected $fillable = ['name', 'description'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
