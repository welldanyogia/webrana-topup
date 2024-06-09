<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TransactionController;
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

//    Route::group(['middleware' => 'checkRole:user'], function() {
//        Route::inertia('/dashboard', 'User/UserDashboard')->name('userDashboard');
//    });
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
        Route::post('/categories/{id}', [CategoryController::class, 'update']);
        Route::post('/categories/delete/{id}', [CategoryController::class, 'destroy']);
        Route::get('/brand',[\App\Http\Controllers\Admin\BrandController::class,'index']);
        Route::get('/admin/brand/{id}',[\App\Http\Controllers\Admin\BrandController::class,'show'])->name('admin.brand.show');
        Route::post('/admin/brand/{id}',[\App\Http\Controllers\Admin\BrandController::class,'update']);
        Route::post('/admin/brand/delete/{id}',[\App\Http\Controllers\Admin\BrandController::class,'destroy']);
        Route::post('/admin/brand/store/data',[\App\Http\Controllers\Admin\BrandController::class,'store']);
        Route::post('/admin/product/{id}',[\App\Http\Controllers\Admin\ProductController::class,'update']);
        Route::post('/admin/store/product', [ProductController::class, 'store']);
        Route::post('/admin/product/{id}/destroy', [ProductController::class, 'destroy'])->name('admin.product.destroy');
        Route::get('/admin/transaction',[\App\Http\Controllers\Admin\TransactionController::class,'index']);
        Route::post('/admin/transaction/{id}/update-status', [TransactionController::class, 'updateStatus'])->name('admin.transactions.update-status');
        Route::get('/admin/product',[\App\Http\Controllers\Admin\ProductController::class,'index']);
        Route::post('/admin/storeOption',[\App\Http\Controllers\Admin\BrandController::class,'storeOption']);
        Route::post('/admin/deleteForm/{id}',[\App\Http\Controllers\Admin\BrandController::class,'deleteForm']);
        Route::get('/admin/setting',[\App\Http\Controllers\Admin\SettingController::class,'index']);
        Route::post('/admin/settings', [SettingController::class, 'store'])->name('admin.settings.store');
        Route::delete('/admin/settings/{id}', [SettingController::class, 'destroy'])->name('admin.settings.destroy');
        Route::get('/admin/whatsapp',[\App\Http\Controllers\Admin\WhatsappGatewayController::class,'index']);
        Route::post('/admin/whatsapp/store',[\App\Http\Controllers\Admin\WhatsappGatewayController::class,'store']);
        Route::post('/admin/store-logo-light', [SettingController::class, 'storeLogoLight'])->name('store.logoLight');
        Route::post('/admin/store-logo-dark', [SettingController::class, 'storeLogoDark'])->name('store.logoDark');
        Route::post('/admin/store-favicon', [SettingController::class, 'storeFavicon'])->name('store.favicon');
        Route::get('/admin/users',[\App\Http\Controllers\Admin\UsersController::class,'index']);
        Route::delete('/admin/brand/{id}/delete-image', [BrandController::class, 'deleteImageUrl'])->name('admin.brand.deleteImageUrl');

    });
    Route::group(['middleware' => ['checkRole:guest,user']], function() {
        Route::inertia('/', 'GuestDashboard')->name('guestDashboard');
        Route::inertia('/product', 'DetailProduct')->name('detailProduct');
        Route::get('/brand/{id}',[\App\Http\Controllers\DetailController::class,'show'])->name('detail');
        Route::get('/transaction/{id}',[\App\Http\Controllers\TransactionController::class,'show'])->name('detail.transaction');
//Route::get('/history',[\App\Http\Controllers\TransactionHistoryController::class,'index'])->name('transaction.history');
        Route::post('/pay',[\App\Http\Controllers\TransactionController::class,'createTransaction'])->name('tripay.create.transaction');
        Route::get('/transactions/history',[\App\Http\Controllers\TransactionHistoryController::class,'index'])->name('history');
        Route::post('/transactions/history', [TransactionHistoryController::class, 'search'])->name('transactions.search');

    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
