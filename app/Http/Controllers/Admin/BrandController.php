<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FormInputBrand;
use App\Models\OptionSelectInput;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::with('category') // Mengambil kategori terkait
        ->withCount('products') // Menghitung jumlah produk terkait
        ->get();
        $categories = Category::all();
        return Inertia::render('Admin/Brand',[
            'brands' => $brands,
            'categories' => $categories,
            'flash' => session('flash')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'brand_name' => 'required|string',
            'category_id' => 'required|string',
            'brand_status' => 'required|integer',
            'image_url' => 'nullable|string',
            'processed_by' => 'required|in:manual,digiflazz' // Tambahkan validasi untuk processed_by
        ]);

        // Buat objek Brand baru dengan menggunakan Eloquent
        $brand = Brand::create([
            'brand_id' => Str::uuid(),
            'brand_name' => $validatedData['brand_name'],
            'category_id' => $validatedData['category_id'],
            'brand_status' => $validatedData['brand_status'],
            'image_url' => $validatedData['image_url'],
            'processed_by' => $validatedData['processed_by'] // Masukkan processed_by yang telah divalidasi
        ]);

        return redirect()->back()->with(['flash'=>['message' => 'Brand created successfully']]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::where('brand_id', $id)
            ->with(['products', 'category'])
            ->first();
//        $brand = Brand::find($id)->with('products')->get();;
        $products = Product::where('brand_id', $id)
            ->orderBy('price', 'asc')
            ->paginate();
        $productsAll = Product::where('brand_id', $id)
            ->orderBy('price', 'asc')->get();
        $formInputs = FormInputBrand::where('brand_id',$id)->with('options')->get();
//        $optionsInput = OptionSelectInput::where('form_input_id',$formInputs->id)->get();
        $categories = Category::all();

        return Inertia::render('Admin/DetailBrand',[
//            'brands' => $brands,
            'brand' => $brand,
            'products' => $products,
            'formInputs' => $formInputs,
//            'optionsInput' => $optionsInput,
            'flash' => session('flash'),
            'categories' => $categories,
            'productsAll' => $productsAll,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validasi input
        $request->validate([
            'brand_name' => 'nullable|string|max:255',
            'category_id' => 'nullable|string|exists:categories,category_id',
            'brand_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'brand_status' => 'nullable|boolean',
            'processed_by' => 'nullable|in:manual,digiflazz',
            'mass_profit' => 'nullable|numeric',
            'qty_minimum' => 'nullable|numeric',
            'mass_profit_status' => 'nullable|boolean',
            'qty_status' => 'nullable|boolean',
            'brand_des' => 'nullable',
        ]);

        // Pastikan setidaknya satu kolom diisi
        $input = $request->only([
            'brand_name',
            'category_id',
            'brand_image',
            'brand_status',
            'processed_by',
            'mass_profit',
            'mass_profit_status',
            'qty_status',
            'qty_minimum',
            'brand_desc'
        ]);

        if (empty(array_filter($input, fn($value) => !is_null($value) && $value !== ''))) {
            return redirect()->back()->with(['error' => 'At least one field must be provided.']);
        }

        // Temukan Brand berdasarkan ID
        $brand = Brand::findOrFail($id);
        try {
            if ($request->hasFile('brand_image')) {
                $image = $request->file('brand_image');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->storeAs('public/images', $imageName);

                // Simpan nama file gambar di database
                $brand->image_url = 'storage/images/'.$imageName;
            }

            // Simpan perubahan
            $brand->update($input);

            if ($brand->mass_profit_status == 1) {
                $products = Product::where('brand_id', $brand->brand_id)->get();
                foreach ($products as $product) {
                    $product->selling_price = intval($product->price + ($product->price * ($brand->mass_profit / 100)));
                    $product->save();
                }
            }

            return redirect()->back()->with(['flash'=>['success' => 'Brand updated successfully']]);
        }catch (\Exception $exception){
            return redirect()->back()->with(['flash'=>['error' => $exception->getMessage()]]);
        }
        // Proses upload gambar jika ada

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::findOrFail($id);

        // Hapus kategori
        $brand->delete();

        // Redirect back dengan flash message sukses
        return redirect()->back()->with(['flash'=>['success' => 'Brand deleted successfully']]);
    }

    public function storeOption(Request $request)
    {
        try {
            $request->validate([
                'value' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'form_input_id' => 'required',
            ]);

            OptionSelectInput::create([
                'name' => $request->input('name'),
                'form_input_id' => $request->input('form_input_id'),
                'value' => $request->input('value'),
            ]);
            return redirect()->back()->with(['flash'=>['message' => 'Option added successfully']]);
        }catch (\Exception $exception){
            return redirect()->back()->with(['flash'=>['message' => $exception->getMessage()]]);
        }

    }

    public function deleteForm(string $id)
    {
        try {
            FormInputBrand::find($id)->delete();

            return redirect()->back()->with(['flash'=>['message' => 'Form deleted successfully']]);
        }catch (\Exception $exception){
            return redirect()->back()->with(['flash'=>['message' => $exception->getMessage()]]);
        }
    }
    public function deleteImageUrl(string $id)
    {
        // Temukan Brand berdasarkan ID
        $brand = Brand::findOrFail($id);

        // Hapus file gambar dari storage jika ada
        if ($brand->image_url && Storage::exists($brand->image_url)) {
            Storage::delete($brand->image_url);
        }

        // Hapus URL gambar dari kolom image_url
        $brand->image_url = null;
        $brand->save();

        // Redirect back dengan flash message sukses
        return redirect()->back()->with(['flash' => ['success' => 'Image URL deleted successfully']]);
    }
}
