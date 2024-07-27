<?php

namespace App\Http\Controllers;

use App\Imports\HotspotUsersImport;
use App\Services\MikrotikService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

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


    public function import(Request $request)
    {
        $request->validate([
            'excel' => 'required|mimes:xlsx,xls,csv'
        ]);

        $file = $request->file('excel');

        $users = Excel::toArray(new HotspotUsersImport, $file)[0];

        $addedUsers = [];
        $failedUsers = [];

        foreach ($users as $user) {
            try {
                $this->mikrotikService->addHotspotUser(
                    $user['username'],
                    $user['password'],
                    $user['profile'] ?? null
                );
                $addedUsers[] = $user['username'];
            } catch (\Exception $e) {
                $failedUsers[] = [
                    'username' => $user['username'],
                    'error' => $e->getMessage()
                ];
            }
        }

        return response()->json([
            'message' => 'Import process completed',
            'added_users' => $addedUsers,
            'failed_users' => $failedUsers
        ]);
    }
}
