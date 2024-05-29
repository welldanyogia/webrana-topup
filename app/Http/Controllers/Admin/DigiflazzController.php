<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\DigiAuth;
use App\Models\Product;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DigiflazzController extends Controller
{
    public function index(){
        $latestAuth = DigiAuth::latest()->first();
        $ipAddress = $this->getClientIP();

        $balance = null;
        if ($latestAuth) {
            $balance = $this->checkBalance($latestAuth->username, $latestAuth->api_key);
        }
        return Inertia::render('Admin/Digiflazz', [
            'digi_auth' => $latestAuth,
            'digi_balance' => $balance,
            'ipAddress' => $ipAddress,
        ]);
    }

    public function store(Request $request)
    {
        DigiAuth::updateOrCreate([
            'username' => $request->username_digiflazz,
            'api_key' => $request->api_key_digiflazz
        ]);
    }

    private function checkBalance($username, $apiKey)
    {
        $sign = md5($username . $apiKey . 'depo');
        $response = Http::post('https://api.digiflazz.com/v1/cek-saldo', [
            'cmd' => 'deposit',
            'username' => $username,
            'sign' => $sign,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return $data['data']['deposit'] ?? null;
        }

        return null;
    }

    public function fetchAndStorePriceList()
    {
        // Validasi request
        $latestAuth = DigiAuth::latest()->first();
        $sign = md5($latestAuth->username . $latestAuth->api_key . 'prepaid');
        // Mengirim request ke endpoint API
        $response = Http::post('https://api.digiflazz.com/v1/price-list', [
            'cmd' => 'prepaid', // atau 'cmd' => 'postpaid' sesuai kebutuhan
            'username' => $latestAuth->username,
            'sign' => $sign,
        ]);

        // Memeriksa apakah responsenya berhasil
        if ($response->successful()) {
            // Mendapatkan data dari response
            $priceList = $response->json()['data'];

            // Menyimpan data brand, category, dan type ke dalam database
            $products = [];
            foreach ($priceList as $item) {
                $status = $item['seller_product_status'] && $item['buyer_product_status'];
                // Menyimpan hanya jika seller_product_status dan buyer_product_status bernilai true
                if ($status) {
                    // Lakukan penyimpanan data produk
//                    $this->storeProduct(['product_status'=> $status]);
                    $this->storeProduct($item,$status);
                } else {
                    // Jika salah satu status bernilai false, cek apakah data sudah tersimpan sebelumnya
                    $existingProduct = Product::where('product_name', $item['product_name'])->first();
                    if ($existingProduct) {
                        // Jika sudah tersimpan, hapus data atau ubah status produk menjadi false
//                        $existingProduct->delete();
                        // atau
                        $this->storeProduct($item,$status);
//                        $existingProduct->update(['product_status' => false]);
                    }
                }
            }

            return redirect()->back()->with('flash',['message' =>'Price list fetched and stored successfully.','type' => 'success']);
        } else {
            return redirect()->back()->with('flash',['message'=>'Failed to fetch price list.', 'type' => 'error']);
        }
    }

    private function storeProduct($item,$status)
    {
        $category = Category::firstOrCreate(
            ['category_name' => $item['category']],
            [
                'category_id' => Str::uuid(),
                'category_name' => $item['category'],
                'category_status' => true,
            ]
        );

        $categoryId = $category->category_id;

        $brand = Brand::firstOrCreate(
            ['brand_name' => $item['brand']],
            [
                'brand_id' => Str::uuid(),
                'brand_name' => $item['brand'],
                'brand_status' => true,
                'category_id' => $categoryId,
            ]
        );

        $brandId = $brand->brand_id;

        $type = Type::firstOrCreate(
            ['type_name' => $item['type']],
            [
                'type_id' => Str::uuid(),
                'type_name' => $item['type'],
                'type_status' => true
            ]
        );
        $typeId = $type->type_id;

        Product::updateOrCreate(
            ['product_name' => $item['product_name']],
            [
                'product_name' => $item['product_name'],
                'category_id' => $categoryId,
                'brand_id' => $brandId,
                'type_id' => $typeId,
                'seller_name' => $item['seller_name'],
                'price' => $item['price'],
//                'selling_price' => $item['price'],
                'product_status' => $status,
                'buyer_sku_code' => $item['buyer_sku_code'],
                'buyer_product_status' => $item['buyer_product_status'],
                'seller_product_status' => $item['seller_product_status'],
                'unlimited_stock' => $item['unlimited_stock'],
                'stock' => $item['stock'],
                'multi' => $item['multi'],
                'start_cut_off' => $item['start_cut_off'],
                'end_cut_off' => $item['end_cut_off'],
                'desc' => $item['desc'],
            ]
        );
    }
    function getClientIP() {
        // Check for shared Internet connections
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
        // Check for IPs passing through proxies
        elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        // Otherwise, use the remote address
        else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
}
