<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
