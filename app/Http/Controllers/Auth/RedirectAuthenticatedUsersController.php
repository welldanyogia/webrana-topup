<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home()
    {
        if (auth()->user()->role == 'admin') {
            return redirect()->to('/admin');
        }
//        else
            if(auth()->user()->role == 'user'){
            return redirect('/');
        }
        elseif(auth()->user()->role == 'guest'){
            return redirect('/');
        }
//        else{
//            return auth()->logout();
//        }
    }
}
