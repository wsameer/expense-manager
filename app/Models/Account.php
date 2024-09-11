<?php

namespace App\Models;

use App\Enums\AccountGroup;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'name',
    'group',
    'balance',
    'description',
    'payment_account_id',
    'user_id',
    'created_at',
    'updated_at',
  ];

  protected $casts = [
    'group' => AccountGroup::class,
    'balance' => 'decimal:2',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function paymentAccount()
  {
    return $this->belongsTo(Account::class, 'payment_account_id');
  }

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
