<?php

namespace App\Enums;

enum AccountGroup: string
{
  case CASH = 'CASH';
  case CHEQUING = 'CHEQUING';
  case CREDIT_CARD = 'CREDIT_CARD';
  case SAVINGS = 'SAVINGS';
  case INVESTMENTS = 'INVESTMENTS';
}
