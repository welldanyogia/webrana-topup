<?php

namespace App\Http\Middleware;

use App\Models\Banner;
use App\Models\Category;
use App\Models\TripayPaymentChannel;
use App\Models\WebIndetity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => Auth::user(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => $request->session()->get('error'),
            ],
            'categories' => Category::where('category_status',1)->with('brands')->get(),
            'tripayPaymentChannel' => TripayPaymentChannel::all(),
            'web_identity' => WebIndetity::latest()->first(),
            'errors' => function () use ($request) {
                return $request->session()->get('errors')
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            'banners' => Banner::all(),
        ];
    }
}
