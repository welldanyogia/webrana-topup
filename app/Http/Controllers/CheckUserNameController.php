<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CheckUserNameController extends Controller
{
    public function checkUserName(Request $request)
    {
        $merchant_id = 'M230205PCUY8759RP';
        $user_id = $request->get('user_id');
        $gamecode = Str::of($request->get('brand_name'))
            ->lower()
            ->replace(' ', '');
        $secret_key = '65c37d60b2a8ca3e5d9bdbe5b0c7f9fe10aa7d0149a92bd618cacaf03daa3933';
        $sign = md5($merchant_id. $secret_key);
        $endpoint = "https://v1.apigames.id/merchant/{$merchant_id}/cek-username/{$gamecode}?user_id={$user_id}&signature={$sign}";

        $response = Http::get($endpoint);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Failed to fetch data'], $response->status());
        }

    }
}
