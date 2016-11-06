<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use App\User;
use App\Form;


class FormsController extends Controller
{
    //
    private function get_id($token){
    	$user_array = User::where('access_token',$token)->take(1)->get()->toArray();
		if ($user_array) {
			$user = [
				'id' => $user_array[0]['id'],
			];
			return $user;
		}else{
			return null;
		}
    }
    public function index(){
    	$user_id = $this->get_id(Input::get('access_token'));
    	$data = Form::where('user_id',$user_id)->take(1)->get()->toArray();
    	dd($data);
    }

    public function store(Request $req){
    	$user_id = $this->get_id($req->input('access_token'));
    	if ($user_id) {
    		$form = new Form();
    		$form->user_id = $user_id['id'];
    		$form->form_name=$req->input('form_name');
    		$form->form_json=$req->input('form_json');
    		$form->save();
    		return response()->json(['err' => '']);
    	}
    	return response()->json(['err' => 'token_ERR']);
    }
    public function update(Request $req){

    	$user_id = $this->get_id($req->input('access_token'));
    	if (!$user_id) {
    		return response()->json(['err' => 'token_ERR']);
    	}
    	$form = Form::findOrFail($req->input('id'));
    	if ($user_id['id'] != $form['user_id']) {
    		return response()->json(['err' => 'Operation not permitted']);
    	}

    	 if ($req->input('form_name')) {
			$form->form_name = $req->input('form_name');
		}
		if ($req->input('form_json')) {
			$form->form_json = $req->input('form_json');
		}
		$form->save();
    }
    public function delete(Request $req){
    	$user_id = $this->get_id($req->input('access_token'));
    	if (!$user_id) {
    		return response()->json(['err' => 'token_ERR']);
    	}
    	$form = Form::findOrFail($req->input('id'));

    	if ($user_id['id']  != $form['user_id']) {
    		return response()->json(['err' => 'Operation not permitted']);
    	}
		$form->delete();
		return response()->json(['err'=>'']);
	}

}
