<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use App\User;

class UsersController extends Controller
{
    //
    /*
	 * token_check
	 */
	private function token_check($token){
		$user_array = User::where('access_token',$token)->take(1)->get()->toArray();
		if ($user_array) {
			$user = [
				'id' => $user_array[0]['id'],
				'friend_flag'=> $user_array[0]['friend_flag']
			];
			return $user;
		}else{
			return null;
		}
 
	}
    public function index(){
    	$data = $this->token_check(Input::get('access_token'));
    	if ($data) {
    		return response()->json($data);
    	}
    	return response()->json([
    			'err'=>'token is not fand'
    			]);
    }

}
