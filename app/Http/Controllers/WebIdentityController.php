<?php

namespace App\Http\Controllers;

use App\Models\WebIndetity;
use Illuminate\Http\Request;

class WebIdentityController extends Controller
{
    public function getAppName()
    {
        $setting = WebIndetity::where('key', 'app_name')->first();
        return response()->json(['app_name' => $setting ? $setting->value : 'Default App Name']);
    }

    public function setAppName(Request $request)
    {
        $setting = WebIndetity::updateOrCreate(
            ['key' => 'app_name'],
            ['value' => $request->input('value')]
        );
        return response()->json($setting);
    }
}
