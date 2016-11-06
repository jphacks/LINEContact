<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Socialite;
use App\Xauth;
use App\User;


class LineOauthController extends Controller
{
    //
    public function redirect()
    {

        return Socialite::driver('line')->redirect();
    }

    public function callback()
    {
        // $data = Socialite::driver('line')->user();
        //データ取り出し
        // $token = $data->token;
        // $e_mail =  $data->email;
        //ダミーデータ
        $token = "hoge";
        $e_mail= "aa@bb.com";
        // xauthテーブル挿入
        $xauth = new Xauth();
        $xauth->access_token= $token;
        $xauth->num = $this->makeRandStr(4);
        $xauth->save();
        //userテーブル挿入
        $user = new User();
        $user->e_mail= $e_mail;
        $user->access_token= $token;
        $user->friend_flag=false; 
        $user->save();



    }
    private function makeRandStr($length) {
    $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
    $r_str = null;
    for ($i = 0; $i < $length; $i++) {
        $r_str .= $str[rand(0, count($str) - 1)];
    }
    return $r_str;
}
}
