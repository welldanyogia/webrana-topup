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
        $request->validate([
            'product_name' => 'required|string|max:255',
            'brand_id' => 'required|string|exists:brands,brand_id',
            'type_id' => 'nullable|string',
//            'seller_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'buyer_sku_code' => 'required|string|max:255',
//            'buyer_product_status' => 'required|string|max:255',
//            'seller_product_status' => 'required|string|max:255',
//            'unlimited_stock' => 'required|boolean',
//            'stock' => 'nullable|numeric',
//            'multi' => 'required|boolean',
//            'start_cut_off' => 'required|string|max:255',
//            'end_cut_off' => 'required|string|max:255',
            'desc' => 'required|string',
            'product_status' => 'required|boolean',
        ]);

        Product::create($request->all());

        return redirect()->back()->with(['success'=> 'Product created successfully!']);
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
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return redirect()->back()->with(['flash'=>['success' => 'Product deleted successfully']]);
        } catch (\Exception $e) {
            return redirect()->back()->with(['flash'=>['error' => 'Failed to delete product']]);
        }
    }
}
