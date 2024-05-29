<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('brands')->get();
        $totalBrands = [];
        foreach ($categories as $category) {
            $totalBrands[] = Brand::where('category_id', $category->category_id)->get()->count();
        }
        return Inertia::render('Admin/Category',[
            'categories' => $categories,
            'flash' => session('flash')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        $request->validate([
//            'category_name' => 'required',
//            'status_name' => 'required',
//        ]);

        try {
            Category::create([
                'category_id' => Str::uuid(),
                'category_name' => $request->get('category_name'),
                'category_status' => $request->get('category_status'),
            ]);

            // Flash message on success
            return redirect()->back()->with('flash',['type'=>'success', 'message'=>'Category created successfully']);
        } catch (\Exception $e) {
            // Flash message on failure
            return redirect()->back()->with('flash',['type'=>'error','message' => 'Failed to create category: ' . $e->getMessage()]);
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
        //
    }
}
