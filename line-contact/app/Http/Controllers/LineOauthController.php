<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Socialite;

class LineOauthController extends Controller
{
    //
    public function redirect()
    {
        return Socialite::driver('line')->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('line')->user();
        var_dump($user);
    }
}
