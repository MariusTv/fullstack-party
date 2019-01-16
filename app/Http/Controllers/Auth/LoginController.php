<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Auth;
use Socialite;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        try {
            $user = Socialite::driver('github')->user();
        } catch (\Exception $e) {
            return redirect('auth/github');
        }
        session(['user_token' => $user->token]);

        return response()->redirectTo('/');
    }

    public function logout() {
        session()->forget('user_token');
        session()->flush();

        return redirect('/login');
    }
}
