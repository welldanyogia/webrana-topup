<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Transactions;
use App\Models\Tripay;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CreateTransactionTest extends TestCase
{
//    public function setUp(): void
//    {
//        parent::setUp();
//        // Seed or prepare necessary data
//        Tripay::factory()->create([
//            'api_key' => 'dummy_api_key',
//        ]);
//    }

    public function testCreateTransactionSuccessful()
    {
        $this->withoutExceptionHandling();

        // Mock HTTP response
        Http::fake([
            'https://api.tripay.co.id/transaction/create' => Http::response([
                'data' => [
                    'merchant_ref' => 'TEST1234',
                    'order_items' => [
                        [
                            'sku' => 'SKU123',
                            'name' => 'Product Name',
                            'price' => 50000,
                            'quantity' => 1,
                        ]
                    ],
                    'amount' => 50000,
                    'total_fee' => 1000,
                    'payment_method' => 'QRIS',
                    'payment_name' => 'Bank Name',
                    'status' => 'UNPAID',
                    'expired_time' => time() + 3600,
                    'qr_url' => null,
                    'qr_string' => null,
                    'pay_code' => '12345678',
                ]
            ], 200)
        ]);

        // Mock request data
        $requestData = [
            'user_id' => 1,
            'amount' => 50000,
            'method_code' => 'QRIS',
            'customer_name' => 'John Doe',
            'email_customer' => 'johndoe@example.com',
            'product_code' => 'SKU123',
            'product_name' => 'Product Name',
            'product_brand' => 'Brand',
            'product_price' => 50000,
        ];

        $response = $this->post(route('tripay.create.transaction'), $requestData);
        Log::info('Response content: ', ['content' => $response]);

//        $response->assertRedirect(route('detail.transaction', $response->transaction_id));

        $this->assertDatabaseHas('transactions', [
//            'trx_id' => 'TEST1234',
            'user_id' => 1,
            'product_name' => 'Product Name',
            'amount' => 50000,
            'status' => 'pending',
        ]);
    }

    public function testCreateTransactionWithMissingAPIKey()
    {
        // Delete the Tripay API key
        Tripay::query()->delete();

        $requestData = [
            'user_id' => 1,
            'amount' => 50000,
            'method_code' => 'BANK_TRANSFER',
            'customer_name' => 'John Doe',
            'email_customer' => 'johndoe@example.com',
            'product_code' => 'SKU123',
            'product_name' => 'Product Name',
            'product_brand' => 'Brand',
            'product_price' => 50000,
        ];

        $response = $this->post(route('transaction.create'), $requestData);

        $response->assertSessionHas('flash.message', 'Transaksi Gagal, Segera hubungi admin.');
        Log::assertLogged('error', function ($message) {
            return str_contains($message, 'API key not found');
        });
    }

    public function testCreateTransactionFailedResponse()
    {
        // Mock failed HTTP response
        Http::fake([
            'https://api.tripay.co.id/transaction/create' => Http::response([
                'message' => 'Invalid request',
            ], 400)
        ]);

        $requestData = [
            'user_id' => 1,
            'amount' => 50000,
            'method_code' => 'BANK_TRANSFER',
            'customer_name' => 'John Doe',
            'email_customer' => 'johndoe@example.com',
            'product_code' => 'SKU123',
            'product_name' => 'Product Name',
            'product_brand' => 'Brand',
            'product_price' => 50000,
        ];

        $response = $this->post(route('transaction.create'), $requestData);

        $response->assertSessionHas('flash.message', 'Transaksi gagal');
        Log::assertLogged('error', function ($message) {
            return str_contains($message, 'Failed to create transaction');
        });
    }
}
