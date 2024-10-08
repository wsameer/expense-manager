<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{

  protected $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }


  /**
   * Handle a registration request for the application.
   *
   * @param Request $request
   * @return JsonResponse
   * @throws ValidationException
   */
  public function register(Request $request): JsonResponse
  {

    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    if ($validator->fails()) {
      $firstError = $validator->errors()->first();
      return $this->sendError('The given data was invalid', [$firstError], 422);
    }

    $user = $this->userService->createUser([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    return $this->sendResponse(
      ['user' => $user],
      'User registered successfully',
      201
    );
  }

  /**
   * Handle a login request for the application
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function login(Request $request): JsonResponse
  {

    if (!Auth::attempt($request->only('email', 'password'))) {
      return $this->sendError('User does not exist', ['error' => 'Unauthorized'], 404);
    }

    /** @var \App\Models\User $user **/
    $user = Auth::user();
    $success['token'] = $user->createToken('auth_token')->plainTextToken;
    $success['name'] =  $user->name;
    $success['email'] =  $user->email;

    return $this->sendResponse($success, 'User logged in successfully');
  }

  /**
   * Logs out the user and revokes all tokens
   * @return JsonResponse
   */
  public function logout(Request $request): JsonResponse
  {
    try {
      // Revoke the token that was used to authenticate the current request
      $request->user()->currentAccessToken()->delete();

      return $this->sendResponse([], 'User logged out successfully');
    } catch (\Exception $e) {
      return $this->sendError($e->getMessage(), [], 503);
    }
  }
}
