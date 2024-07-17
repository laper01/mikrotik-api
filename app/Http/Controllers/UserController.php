<?php

namespace App\Http\Controllers;

use App\Services\MikrotikService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $mikrotikService;

    public function __construct(MikrotikService $mikrotikService)
    {
        $this->mikrotikService = $mikrotikService;
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $username = $request->input('username');
        $newPassword = $request->input('password');

        // Check if the user exists
        $user = $this->mikrotikService->findUserByName($username);
        // return response()->json($user);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's password
        $this->mikrotikService->updateHotspotUserPassword($username, $newPassword);

        return response()->json(['message' => 'Password updated successfully']);
    }
}
