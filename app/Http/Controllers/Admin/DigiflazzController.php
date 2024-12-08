<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\DigiAuth;
use App\Models\Fonnte;
use App\Models\Product;
use App\Models\Type;
use App\Services\FonnteService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DigiflazzController extends Controller
{
    protected $url;
    protected $acc_token;
    protected $wa_owner;
    protected $fonnteService;


    public function __construct(FonnteService $fonnteService)
    {
        $latest = DigiAuth::latest()->first();
        $latestFonnte = Fonnte::latest()->first();
        $this->fonnteService = $fonnteService;

        if ($latestFonnte) {
            $this->acc_token = $latestFonnte->acc_token;
            $this->wa_owner = $latestFonnte->wa_owner;
        } else {
            $this->acc_token = null;
            $this->wa_owner = null;
        }
//        if ($latest) {
//            if ($latest->is_production === 0) {
//                $this->url = "https://api.digiflazz.com/v1";
//            } elseif ($latest->is_production === 1) {
//                $this->url = "https://api.digiflazz.com/v1";
//            }
//        }
        $this->url = "https://api.digiflazz.com/v1";

    }
    public function index(){
        $latestAuth = DigiAuth::latest()->first();
        $ipAddress = $this->getServerIP();
        $existingProducts = Product::whereHas('brand', function($query) {
            $query->where('processed_by', 'manual');
        })->get();

        $balance = null;
        if ($latestAuth) {
            $balance = $this->checkBalance($latestAuth->username, $latestAuth->api_key);
            DigiAuth::findOrFail($latestAuth->id)->update([
                'digi_balance' => $balance,
            ]);
        }
        return Inertia::render('Admin/Digiflazz', [
            'digi_auth' => $latestAuth,
            'digi_balance' => $balance,
            'ipAddress' => $ipAddress,
            'existingProducts' => $existingProducts,
        ]);
    }

    public function store(Request $request)
    {
        DigiAuth::updateOrCreate([
            'username' => $request->username_digiflazz,
            'api_key' => $request->api_key_digiflazz,
            'digi_balance' => $this->checkBalance(request()->username, request()->api_key),
            'is_production' => $request->is_production
        ]);
    }

    private function checkBalance($username, $apiKey)
    {
        $sign = md5($username . $apiKey . 'depo');
        $response = Http::post($this->url .'/cek-saldo', [
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

//    public function fetchAndStorePriceList()
//    {
//        Log::info('Fetching and storing price list ' . now());
//
//
////        $message = config('app.name') . " Fetching and storing price list\n" . Carbon::now()->locale('id')->translatedFormat('d F Y H:i:s');
////        $this->sendMessage($message);
//        // Validasi request dan buat tanda tangan
//        $latestAuth = DigiAuth::latest()->first();
//        $sign = md5($latestAuth->username . $latestAuth->api_key . 'prepaid');
//
//        // Kirim permintaan ke endpoint API
//        $response = Http::post($this->url.'/price-list', [
//            'cmd' => 'prepaid', // atau sesuai kebutuhan 'cmd' => 'postpaid'
//            'username' => $latestAuth->username,
//            'sign' => $sign,
//        ]);
//
//        // Periksa apakah respons berhasil
//        if ($response->successful()) {
//            // Ambil data dari respons
//            $priceList = $response->json()['data'];
//
//            // Ambil semua produk yang ada di database sebelum memproses respons
//            $existingProducts = Product::whereHas('brand', function($query) {
//                $query->where('processed_by', 'digiflazz');
//            })->get();
//            $existingProductCodes = $existingProducts->pluck('buyer_sku_code')->toArray();
//
////            Log::info('Existing Productssss: ' . $existingProducts);
//
//            // Simpan SKU yang akan diproses
//            $products = [];
////            $productsUpdated = [];
//
//            foreach ($priceList as $item) {
//                $status = $item['seller_product_status'] && $item['buyer_product_status'];
//
//                // Cari produk yang sudah ada di database berdasarkan buyer_sku_code
//                $existingProduct = Product::where('buyer_sku_code', $item['buyer_sku_code'])->first();
//
//                // Logging informasi produk yang ada
////                Log::info('Existing Product: ' . json_encode($existingProduct));
//
//
//                // Menyimpan hanya jika seller_product_status dan buyer_product_status bernilai true
//                if ($status) {
//                    $this->storeProduct($item, $status);
//                    $productsUpdated[] = $item['buyer_sku_code'];
//                } else {
//                    // Jika salah satu status bernilai false
//                    if ($existingProduct) {
//                        // Hapus data atau ubah status produk menjadi false
//                        $this->storeProduct($item, $status);
//                        $productsUpdated[] = $item['buyer_sku_code'];
//                    }
//                }
//
//                // Simpan SKU yang diproses ke dalam array
//                $products[] = $item['buyer_sku_code'];
////                $message = 'Product Updated ' . implode(', ',$productsUpdated);
////                $this->sendMessage($message);
//
//            }
//
//            // Cari produk yang ada di database tapi tidak ada di respons dan hapus
//            $productsToDelete = array_diff($existingProductCodes, $products);
////            Log::info('Products to delete: ' . implode(', ', $productsToDelete));
////            Log::info('Existing Product: ' . implode(', ', $existingProducts));
//
//            // Hapus produk yang tidak diperlukan
//            Product::whereIn('buyer_sku_code', $productsToDelete)->delete();
//
//            return redirect()->back()->with(['flash' => ['success' => 'Price list fetched and stored successfully.']]);
//        } else {
//            return redirect()->back()->with(['flash' => ['error' => 'Failed to fetch price list.']]);
//        }
//    }

    public function fetchAndStorePriceList()
    {
        Log::info('Fetching and storing price list ' . now());

        $latestAuth = DigiAuth::latest()->first();
        $sign = md5($latestAuth->username . $latestAuth->api_key . 'prepaid');

        // Kirim permintaan ke endpoint API
        $response = Http::post($this->url.'/price-list', [
            'cmd' => 'prepaid',
            'username' => $latestAuth->username,
            'sign' => $sign,
        ]);

        // Periksa apakah respons berhasil
        if ($response->successful()) {
            $priceList = $response->json()['data'];

            $existingProducts = Product::whereHas('brand', function($query) {
                $query->where('processed_by', 'digiflazz');
            })->get();
            $existingProductCodes = $existingProducts->pluck('buyer_sku_code')->toArray();

            $products = [];
            $productsUpdated = [];

            foreach ($priceList as $item) {
                // Check if buyer_sku_code starts with "WS"
//                if (!Str::startsWith($item['buyer_sku_code'], )) {
//                    continue; // Skip processing if it doesn't start with "WS"
//                }

                $status = $item['seller_product_status'] && $item['buyer_product_status'];

                $existingProduct = Product::where('buyer_sku_code', $item['buyer_sku_code'])->first();

                // Process only if both statuses are true
                if ($status) {
                    $this->storeProduct($item, $status);
                    $productsUpdated[] = $item['buyer_sku_code'];
                } else {
                    if ($existingProduct) {
                        // Update or deactivate product if necessary
                        $this->storeProduct($item, $status);
                        $productsUpdated[] = $item['buyer_sku_code'];
                    }
                }

                $products[] = $item['buyer_sku_code'];
            }

            $productsToDelete = array_diff($existingProductCodes, $products);

            Product::whereIn('buyer_sku_code', $productsToDelete)->delete();

            return redirect()->back()->with(['flash' => ['success' => 'Price list fetched and stored successfully.']]);
        } else {
            return redirect()->back()->with(['flash' => ['error' => 'Failed to fetch price list.']]);
        }
    }

    private function storeProduct($item, $status)
    {
        $category = Category::firstOrCreate(
            ['code' => $item['category']],
            [
                'category_id' => Str::uuid(),
                'category_name' => $item['category'],
                'code' => $item['category'],
                'category_status' => true,
            ]
        );

        $categoryId = $category->category_id;

        $brand = Brand::firstOrCreate(
            ['code' => $item['brand']],
            [
                'brand_id' => Str::uuid(),
                'brand_name' => $item['brand'],
                'code' => $item['brand'],
                'brand_status' => true,
                'category_id' => $categoryId,
            ]
        );

        $brandId = $brand->brand_id;
        $selling_price = 0;
        if ($brand->mass_profit_status === 1) {
            $selling_price = $item['price'] + ($item['price'] * ($brand->mass_profit / 100));
        }

        $type = Type::firstOrCreate(
            ['type_name' => $item['type']],
            [
                'type_id' => Str::uuid(),
                'type_name' => $item['type'],
                'type_status' => true,
            ]
        );
        $typeId = $type->type_id;

        Product::updateOrCreate(
            ['buyer_sku_code' => $item['buyer_sku_code']],
            [
                'product_name' => $item['product_name'],
                'category_id' => $categoryId,
                'brand_id' => $brandId,
                'type_id' => $typeId,
                'seller_name' => $item['seller_name'],
                'price' => $item['price'],
                'selling_price' => $selling_price,
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

    function getServerIP() {
        if (isset($_SERVER['SERVER_ADDR'])) {
            return $_SERVER['SERVER_ADDR'];
        } else {
            return gethostbyname(gethostname());
        }
    }

    public function sendMessage($message): \Illuminate\Http\RedirectResponse
    {
//        $request->validate([
//            'target' => $this->wa_owner,
//            'message' => 'Test Whatsapp Gateway Message',
//            // Add other validations as needed
//        ]);
        $data = [
            'target' => $this->wa_owner,
            'message' => $message. now(),
        ];

        try {
            $this->fonnteService->sendMessage($data);

            return redirect()->back()->with(['flash' => ['success' => 'Successfully test send message to '. $data->target]]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to test send message. '. $e->getMessage()]);
        }
    }
}
