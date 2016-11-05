<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
	info("uhohoho");
    // return view('welcome');
});
Route::get('/user','UsersController@index');
Route::get('/form','FormsController@index');
Route::post('/form/store','FormsController@store');
Route::post('/form/update','FormsController@update');
Route::post('/form/delete','FormsController@delete');
