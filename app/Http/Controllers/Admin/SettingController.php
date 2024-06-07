<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
//use Intervention\Image\Image;
//use Intervention\Image\Image;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Laravel\Facades\Image;
//use Intervention\Image\ImageManager;
use Laravel\Reverb\Loggers\Log;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::all();
        return Inertia::render('Admin/Setting', ['banners' => $banners]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'banner' => 'required|image', // Validate image and max size of 2MB
            ]);

            if ($request->hasFile('banner')) {
                $image = $request->file('banner');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->storeAs('public/banners', $imageName);

                // Save the image path to the database
                Banner::create([
                    'banner_url' => 'storage/banners/'.$imageName,
                ]);
            }

            return redirect()->back()->with(['flash'=>['message' => 'Banner added successfully']]);
        } catch (\Exception $exception) {
            return redirect()->back()->with(['flash'=>['error' => $exception->getMessage()]]);
        }

    }

    /**
     * Store a newly uploaded logo and replace the existing logo_dark.png file.
     */
    public function storeLogoLight(Request $request)
    {
        try {
            $request->validate([
                'logo_light' => 'required|image', // Validate image and max size of 2MB
            ]);

            if ($request->hasFile('logo_light')) {
                $image = $request->file('logo_light');
                $imageName = 'logo_light.'.$image->getClientOriginalExtension();
                $imagePath = 'public/'.$imageName;

                // Store the image in the public directory and replace the existing logo_dark.png
                $image->storeAs('public', $imageName);

                // If you want to save the logo path to the database, you can do it here
                // For example, if you have a settings table:
                // Setting::updateOrCreate(['key' => 'logo_dark'], ['value' => 'storage/'.$imageName]);

                return redirect()->back()->with(['flash' => ['message' => 'Logo updated successfully']]);
            }

            return redirect()->back()->with(['flash' => ['error' => 'No logo file was uploaded']]);
        } catch (\Exception $exception) {
            return redirect()->back()->with(['flash' => ['error' => $exception->getMessage()]]);
        }
    }

    public function storeLogoDark(Request $request)
    {
        try {
            $request->validate([
                'logo_dark' => 'required|image', // Validate image and max size of 2MB
            ]);

            if ($request->hasFile('logo_dark')) {
                $image = $request->file('logo_dark');
                $imageName = 'logo_dark.'.$image->getClientOriginalExtension();
                $imagePath = 'public/'.$imageName;

                // Store the image in the public directory and replace the existing logo_dark.png
                $image->storeAs('public', $imageName);

                // If you want to save the logo path to the database, you can do it here
                // For example, if you have a settings table:
                // Setting::updateOrCreate(['key' => 'logo_dark'], ['value' => 'storage/'.$imageName]);

                return redirect()->back()->with(['flash' => ['message' => 'Logo updated successfully']]);
            }

            return redirect()->back()->with(['flash' => ['error' => 'No logo file was uploaded']]);
        } catch (\Exception $exception) {
            return redirect()->back()->with(['flash' => ['error' => $exception->getMessage()]]);
        }
    }

    public function storeFavicon(Request $request)
    {
        $manager = new ImageManager(Driver::class);
        try {
            $request->validate([
                'favicon' => 'required|image|mimes:ico,png|max:2048', // Validate image of type ico or png and max size of 2MB
            ]);

            if ($request->hasFile('favicon')) {
                $image = $request->file('favicon');
                $imageName = 'favicon.ico';
                $imagePath = 'public/' . $imageName;

                // Convert image to .ico if it's not already
                if ($image->getClientOriginalExtension() !== 'ico') {
                    $image = $manager->read($image)->resize(32, 32)->encodeByExtension('png');
                    Storage::put($imagePath, (string)$image);
                } else {
                    $image->storeAs('public', $imageName);
                }

                return redirect()->back()->with(['flash' => ['message' => 'Favicon updated successfully']]);
            }

            return redirect()->back()->with(['flash' => ['error' => 'No favicon file was uploaded']]);
        } catch (\Exception $exception) {
            \Illuminate\Support\Facades\Log::info($exception->getMessage());
            return redirect()->back()->with(['flash' => ['error' => $exception->getMessage()]]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $banner = Banner::findOrFail($id);
            Storage::disk('public')->delete($banner->banner_url);
            $banner->delete();

            return redirect()->back()->with(['flash'=>['message' => 'Banner deleted successfully']]);
        } catch (\Exception $exception) {
            return redirect()->back()->with(['flash'=>['message' => $exception->getMessage()]]);
        }
    }
}
