<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\XenditController;
use App\Http\Controllers\BankAccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/admin/digiflazz/fetch',[\App\Http\Controllers\Admin\DigiflazzController::class,'fetchAndStorePriceList']);
Route::get('/settings/app-name', [\App\Http\Controllers\WebIdentityController::class, 'getAppName']);
Route::post('/settings/app-name', [\App\Http\Controllers\WebIdentityController::class, 'setAppName']);
Route::post('/brands/{id}',[BrandController::class,'update']);
//Route::get('/tripay/getpaymentmethod',[\App\Http\Controllers\Admin\PaymentGatewayController::class,'paymentChannel'])->name('tripay.update.paymentChannel');
Route::post('/addform',[\App\Http\Controllers\FormInputController::class,'store']);
Route::get('/bank/bank-account', [\App\Http\Controllers\BankAccountController::class, 'getAllAccounts']);
Route::get('/bank-list', [BankAccountController::class, 'getList']);
Route::post('/check-mutation/{amount}', [BankAccountController::class, 'checkMutation']);
Route::post('/mutations', [BankAccountController::class, 'getMutations']);


Route::post('/createTransaction',[\App\Http\Controllers\TransactionController::class,'createTransaction'])->name('tripay.create.transaction');
Route::post('/checkusername',[\App\Http\Controllers\CheckUserNameController::class,'checkUserName']);
Route::post('/payment-callback', [\App\Http\Controllers\CallbackController::class, 'handle']);
Route::post('/digiflazz/webhook', [\App\Http\Controllers\DigiflazzWebhookController::class, 'handle']);
Route::post('/send-message', [\App\Http\Controllers\Admin\WhatsappGatewayController::class, 'sendMessage']);
Route::get('/recent-transactions', [\App\Http\Controllers\Admin\DashboardController::class, 'getRecentTransactions']);
Route::post('/bank-transfer/webhook',[\App\Http\Controllers\BankTransferWebhook::class,'handle']);
Route::post('/match-transaction', [BankAccountController::class, 'matchTransaction'])->name('match.transaction');
Route::post('/get-statements/{account_id}', [BankAccountController::class, 'getAccountStatements'])->name('get.statements');
Route::get('/rerun-check-mutation/{account_id}', [BankAccountController::class, 'rerunCheckMutation']);
