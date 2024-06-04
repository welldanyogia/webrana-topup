<?php

namespace App\Http\Controllers;

use App\Models\DigiAuth;
use App\Models\Transactions;
use App\Models\Tripay;
use App\Services\FonnteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CallbackController extends Controller
{
    protected $privateKey;
    protected $username;
    protected $apiKey;
    protected $fonnteService;

    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
        $this->privateKey = Tripay::latest()->first()->private_key;
        $this->username = DigiAuth::latest()->first()->username;
        $this->apiKey = DigiAuth::latest()->first()->api_key;
    }

    public function handle(Request $request)
    {
        $callbackSignature = $request->server('HTTP_X_CALLBACK_SIGNATURE');
        $json = $request->getContent();
        $signature = hash_hmac('sha256', $json, $this->privateKey);

        if ($signature !== (string) $callbackSignature) {
            return $this->errorResponse('Invalid signature');
        }

        if ('payment_status' !== (string) $request->server('HTTP_X_CALLBACK_EVENT')) {
            return $this->errorResponse('Unrecognized callback event, no action was taken');
        }

        $data = json_decode($json);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->errorResponse('Invalid data sent by Tripay');
        }

        $invoiceId = $data->merchant_ref;
        $tripayReference = $data->reference;
        $status = strtoupper((string) $data->status);

        $invoice = Transactions::where('trx_id', $invoiceId)
//            ->where('tripay_reference', $tripayReference)
            ->where('payment_status', '=', 'UNPAID')
            ->first();

        if (! $invoice) {
            return $this->errorResponse('No invoice found or already paid: ' . $invoiceId);
        }

        switch ($status) {
            case 'PAID':
                $invoice->update(['status' => 'process']);
                $invoice->update(['payment_status' => $status]);
                try {
                    $this->fonnteService->sendMessage([
                        'target' => $invoice->phone_number,
                        'message' => "Transaction successful for {$invoice->product_name}\nDengan Status *{$invoice->status}*\n",
                    ]);
                    Log::info('Message sent successfully to ' . $invoice->phone_number);
                } catch (\Exception $e) {
                    Log::error('Failed to send message: ' . $e->getMessage());
                }

                $this->processDigiflazzTopup($invoice);
                return $this->successResponse($invoice->user_id);
                break;
            case 'FAILED':
            case 'EXPIRED':
                $invoice->update(['status' => 'failed']);
                $invoice->update(['payment_status' => $status]);
                return $this->successResponse($invoice->user_id);
                break;

            default:
                return $this->errorResponse('Unrecognized payment status');
        }
    }

    protected function processDigiflazzTopup($invoice)
    {
        $refId = $invoice->trx_id;
        $buyerSkuCode = $invoice->buyer_sku_code;  // Set the product code
        $customerNo = $invoice->user_id;

        $sign = md5($this->username . $this->apiKey . $refId);

        $payload = [
            'username' => $this->username,
            'buyer_sku_code' => $buyerSkuCode,
            'customer_no' => $customerNo,
            'ref_id' => $refId,
            "testing"=> true,
            'sign' => $sign,
        ];

        $response = Http::post('https://api.digiflazz.com/v1/transaction', $payload);

        if ($response->successful()) {
            $responseData = $response->json();
            // Handle the response accordingly
            // Update the invoice status based on Digiflazz response if needed
            $status = $responseData['data']['status'];

            if ($status === 'Sukses') {
                $invoice->update(['status' => 'success', 'digiflazz_status' => $status]);
            } else if ($status === 'Pending' || $status === 'pending'){
                $invoice->update(['status' => 'pending', 'digiflazz_status' => $status]);
            } else {
//                $invoice->update(['status' => 'failed', 'digiflazz_status' => $status]);
                $invoice->update(['status' => 'pending', 'digiflazz_status' => $status]);
            }
        } else {
            // Handle the error accordingly
            // Log the error or take appropriate actions
            $invoice->update(['status' => 'failed']);
        }
    }

    protected function successResponse($message)
    {
        return response()->json(['success' => true,'message' => $message]);
    }

    protected function errorResponse($message)
    {
        return response()->json(['success' => false, 'message' => $message]);
    }
}
