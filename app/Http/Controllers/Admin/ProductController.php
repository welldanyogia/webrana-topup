<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product',[]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        try {
            $product = Product::find($id);
//            $product->save([
//                'product_name' => request('product_name'),
//                'price' => request('price'),
//                'selling_price' => request('selling_price'),
//                'product_status' => request('product_status'),
//            ]);
            $product->product_name = $request->get('product_name');
            $product->price = $request->get('price');
            $product->selling_price = $request->get('selling_price');
            $product->product_status = $request->get('product_status');
            $product->save();

            return redirect()->back()->with(['flash'=>['message' => 'Product updated successfully']]);
        }catch (\Exception $exception){
            return redirect()->back()->with(['flash'=>['message' => $exception->getMessage()]]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
