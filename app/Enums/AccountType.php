<?php

namespace App\Enums;

enum AccountType: string
{
  case CASH = 'cash';
  case CHEQUING = 'chequing';
  case CREDIT_CARD = 'credit_card';
  case SAVINGS = 'savings';
  case INVESTMENTS = 'investments';
}
