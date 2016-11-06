<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    protected $fillable = ['mid', 'e_mail','access_token','refresh_token','friend_flag'];
}
