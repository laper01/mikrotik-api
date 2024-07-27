<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginApiController extends Controller
{
    //
        public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user_model = User::find($user->id);
            $token = $user_model->createToken('MyApp')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout (Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'logout success']);
    }
}
