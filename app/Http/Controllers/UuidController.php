<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UuidController extends Controller
{
    public static function generateCustomUuid($productName): string
    {
        $appName = config('app.name');
//        $productName = Config::get('app.product_name');

        $getInitials = function($string) {
            $words = explode(' ', $string);
            $initials = '';
            foreach ($words as $word) {
                $initials .= strtoupper($word[0]);
            }
            return $initials;
        };

        $appInitials = $getInitials($appName);
        $productInitials = $getInitials($productName);
        $timestamp = now()->format('YmdHis');
        $randomNumber = Str::random(5); // 5 karakter acak

        // Contoh format: APPNAME-PRODUCTNAME-TIMESTAMP-RANDOM
        //        $timestamp = Carbon::createFromTimestamp($productName);
////
//        return response()->json(['customUuid' => $timestamp]);
        return strtoupper($appInitials  . $productInitials . '-' . $timestamp . '-' . $randomNumber);
    }
}
