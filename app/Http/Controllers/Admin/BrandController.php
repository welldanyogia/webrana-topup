<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FormInputBrand;
use App\Models\OptionSelectInput;
use App\Models\Product;
use Illuminate\Http\Request;
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
        $brands = Brand::where('brand_id',$id)->with('products')->get();
        $brand = Brand::find($id);
        $products = Product::where('brand_id', $id)
            ->orderBy('price', 'asc')
            ->paginate();
        $formInputs = FormInputBrand::where('brand_id',$id)->with('options')->get();
//        $optionsInput = OptionSelectInput::where('form_input_id',$formInputs->id)->get();

        return Inertia::render('Admin/DetailBrand',[
            'brands' => $brands,
            'brand' => $brands,
            'products' => $products,
            'formInputs' => $formInputs,
//            'optionsInput' => $optionsInput,
            'flash' => session('flash')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'brand_name' => 'string|max:255',
            'category_id' => 'required|string|exists:categories,category_id',
            'brand_image' => 'image|mimes:jpeg,png,jpg,gif',
            'brand_status' => 'boolean'
        ]);

        // Cari merek berdasarkan ID
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $brand->brand_status = $request->get('brand_status');

        $brand->brand_name = $request->input('brand_name');
        $brand->category_id = $request->input('category_id');


        try {
            if ($request->hasFile('brand_image')) {
                $image = $request->file('brand_image');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->storeAs('public/images', $imageName);

                // Simpan nama file gambar di database
                $brand->image_url = 'storage/images/'.$imageName;
            }

            // Simpan perubahan
            $brand->save();

            return redirect()->back()->with(['message' => 'Brand updated successfully']);
        }catch (\Exception $exception){
            return redirect()->back()->with(['message' => $exception->getMessage()]);
        }
        // Proses upload gambar jika ada

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
}
