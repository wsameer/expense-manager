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

    if (!in_array($statType, ['asset', 'debt'])) {

      return $this->sendError('Invalid parameters', ['Invalid account type. Must be either "asset" or "debt".'], 400);
    }

    $query = Account::query();

    if ($statType === 'debt') {
      $query->where('group', AccountGroup::CREDIT_CARD);
    } else {
      $query->where('group', '!=', AccountGroup::CREDIT_CARD);
    }

    $sum = $query->sum('balance');

    return $this->sendResponse([
      'stat_type' => $statType,
      'total_balance' => $sum
    ]);
  }
}
