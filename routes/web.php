<?php

use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionHistoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('GuestDashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
//    return view('Welcome');
//    return Inertia::render('Welcome', []);
});

Route::group(['middleware' => 'auth'], function() {
//    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"])->name('home');

    Route::group(['middleware' => 'checkRole:user'], function() {
        Route::inertia('/dashboard', 'User/UserDashboard')->name('userDashboard');
    });
    Route::group(['middleware' => ['auth', 'checkRole:admin']], function() {
//        Route::inertia('/admin', 'Admin/AdminDashboard',[\App\Http\Controllers\Admin\DashboardController::class,'index'])->name('adminDashboard');
        Route::get('/admin',[\App\Http\Controllers\Admin\DashboardController::class,'index']);
        Route::get('/admin/digiflazz',[\App\Http\Controllers\Admin\DigiflazzController::class,'index']);
        Route::get('/admin/paymentgateway',[\App\Http\Controllers\Admin\PaymentGatewayController::class,'index']);
        Route::post('/admin/digiflazz/store',[\App\Http\Controllers\Admin\DigiflazzController::class,'store']);
        Route::post('/admin/paymentgateway/store',[\App\Http\Controllers\Admin\PaymentGatewayController::class,'store']);
        Route::post('/admin/digiflazz/fetch',[\App\Http\Controllers\Admin\DigiflazzController::class,'fetchAndStorePriceList']);
        Route::post('/tripay/getpaymentmethod',[\App\Http\Controllers\Admin\PaymentGatewayController::class,'paymentChannel'])->name('tripay.update.paymentChannel');
        Route::get('/category',[\App\Http\Controllers\Admin\CategoryController::class,'index'])->name('admin.category');
        Route::post('/category/store',[\App\Http\Controllers\Admin\CategoryController::class,'store']);
        Route::get('/brand',[\App\Http\Controllers\Admin\BrandController::class,'index']);
        Route::get('/admin/brand/{id}',[\App\Http\Controllers\Admin\BrandController::class,'show'])->name('admin.brand.show');
        Route::post('/admin/brand/{id}',[\App\Http\Controllers\Admin\BrandController::class,'update']);
        Route::post('/admin/product/{id}',[\App\Http\Controllers\Admin\ProductController::class,'update']);
        Route::get('/admin/transaction',[\App\Http\Controllers\Admin\TransactionController::class,'index']);
        Route::get('/admin/product',[\App\Http\Controllers\Admin\ProductController::class,'index']);
        Route::post('/admin/storeOption',[\App\Http\Controllers\Admin\BrandController::class,'storeOption']);
        Route::post('/admin/deleteForm/{id}',[\App\Http\Controllers\Admin\BrandController::class,'deleteForm']);
    });
    Route::group(['middleware' => 'checkRole:guest'], function() {
        Route::inertia('/', 'GuestDashboard')->name('guestDashboard');
    });
    Route::inertia('/product', 'DetailProduct')->name('detailProduct');
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/brand/{id}',[\App\Http\Controllers\DetailController::class,'show'])->name('detail');
Route::get('/transaction/{id}',[\App\Http\Controllers\TransactionController::class,'show'])->name('detail.transaction');
//Route::get('/history',[\App\Http\Controllers\TransactionHistoryController::class,'index'])->name('transaction.history');
Route::post('/pay',[\App\Http\Controllers\TransactionController::class,'createTransaction'])->name('tripay.create.transaction');
Route::get('/transactions/history',[\App\Http\Controllers\TransactionHistoryController::class,'index'])->name('history');
Route::post('/transactions/history', [TransactionHistoryController::class, 'search'])->name('transactions.search');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Route::domain('admin.'.env('APP_URL'))->group(function () {
//    // Rute untuk admin
////    Route::group(['middleware' => ['auth', 'checkRole:admin']], function() {
//////        Route::inertia('/admin', 'Admin/AdminDashboard',[\App\Http\Controllers\Admin\DashboardController::class,'index'])->name('adminDashboard');
////        Route::get('/',[\App\Http\Controllers\Admin\DashboardController::class,'index']);
////        Route::get('/admin/digiflazz',[\App\Http\Controllers\Admin\DigiflazzController::class,'index']);
////        Route::post('/admin/digiflazz/store',[\App\Http\Controllers\Admin\DigiflazzController::class,'store']);
////        Route::post('/admin/digiflazz/fetch',[\App\Http\Controllers\Admin\DigiflazzController::class,'fetchAndStorePriceList']);
////        Route::get('/category',[\App\Http\Controllers\Admin\CategoryController::class,'index']);
////        Route::post('/category/store',[\App\Http\Controllers\Admin\CategoryController::class,'store']);
////        Route::get('/brand',[\App\Http\Controllers\Admin\BrandController::class,'index']);
////        Route::get('/transaction',[\App\Http\Controllers\Admin\TransactionController::class,'index']);
////        Route::get('/admin/product',[\App\Http\Controllers\Admin\ProductController::class,'index']);
////    });
//});

require __DIR__.'/auth.php';
