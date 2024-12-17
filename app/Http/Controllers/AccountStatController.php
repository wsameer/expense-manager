<?php

namespace App\Http\Controllers;

use App\Enums\AccountGroup;
use App\Http\Controllers\API\BaseController;
use App\Models\Account;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountStatController extends BaseController
{
  /**
   * GET account stats
   * @param Request $request
   */
  public function index(Request $request): JsonResponse
  {
    $statType = $request->query('type');

    if (!in_array($statType, ['asset', 'debt', 'total'])) {
      return $this->sendError(
        'Invalid parameters',
        ['Invalid account type. Must be "asset", "debt", or "total".'],
        400
      );
    }

    switch ($statType) {
      case 'debt':
        $totalBalance = Account::where('group', AccountGroup::CREDIT_CARD)->sum('balance');
        break;

      case 'asset':
        $totalBalance = Account::where('group', '!=', AccountGroup::CREDIT_CARD)->sum('balance');
        break;

      case 'total':
        $assets = Account::where('group', '!=', AccountGroup::CREDIT_CARD)->sum('balance');
        $debts = Account::where('group', AccountGroup::CREDIT_CARD)->sum('balance');
        $totalBalance = $assets - $debts;
        break;

      default:
        $totalBalance = 0;
    }

    return $this->sendResponse([
      'stat_type' => $statType,
      'total_balance' => $totalBalance
    ]);
  }
}
