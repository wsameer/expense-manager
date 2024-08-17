<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{

  /**
   * Send success response.
   *
   * @param array $result
   * @param string $message
   * @return \Illuminate\Http\JsonResponse
   */
  public function sendResponse(
    array $payload,
    string $message,
    int $code = 200
  ): JsonResponse {
    $response = [
      'success' => true,
      'data'    => $payload,
      'message' => $message,
    ];

    return response()->json($response, $code);
  }

  /**
   * Send error response.
   *
   * @param string $error
   * @param array $errorMessages
   * @param int $code
   * @return \Illuminate\Http\JsonResponse
   */
  public function sendError(
    string $error,
    array $errorMessages = [],
    int $code = 404
  ): JsonResponse {
    $response = [
      'success' => false,
      'message' => $error,
    ];

    if (!empty($errorMessages)) {
      $response['data'] = $errorMessages;
    }

    return response()->json($response, $code);
  }
}
