<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\DigiAuth;
use App\Models\Fonnte;
use App\Models\Transactions;
use App\Models\Tripay;
use App\Services\FonnteService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BankTransferWebhook extends Controller
{
    protected $username;
    protected $apiKey;
    protected $is_production;
    protected $fonnteService;
    protected $wa_owner;

    public function __construct(FonnteService $fonnteService)
    {
        $latestFonnte = Fonnte::latest()->first();
        if ($latestFonnte) {
            $this->wa_owner = $latestFonnte->wa_owner;
        } else {
            $this->wa_owner = null;
        }
        $this->fonnteService = $fonnteService;
        $this->username = DigiAuth::latest()->first()->username;
        $this->apiKey = DigiAuth::latest()->first()->api_key;
        $this->is_production = DigiAuth::latest()->first()->is_production;
    }
    public function handle(Request $request)
    {
        if ($request->header('Content-Type') == 'application/json') {
            $data = $request->json()->all();
            Log::info('Data diterima:', $data);

            $dataMutasi = $data['data_mutasi'];

            foreach ($dataMutasi as $mutasi) {
                $amount = intval($mutasi['amount']);

                // Pencarian transaksi dengan amount dan unique_code yang sesuai
                $transaction = Transactions::whereRaw('amount + unique_code = ?', [$amount])
                    ->where('payment_status', '!=', 'PAID')
                    ->first();

                if ($transaction) {
                    // Update status pembayaran menjadi PAID
                    $transaction->payment_status = 'PAID';
                    $transaction->save();
                    $process = Brand::where('brand_name', $transaction->product_brand)->first();
                    if ($process->processed_by === 'digiflazz') {
                        try {
                            $this->sendInvoiceToWhatsApp($transaction,$transaction->phone_number);
                            Log::info('Message sent successfully to ' . $transaction->phone_number);
                        } catch (\Exception $e) {
                            Log::error('Failed to send message: ' . $e->getMessage());
                        }
                        $this->processDigiflazzTopup($transaction);
                    }
                    if ($process->processed_by === 'manual'){
                        try {
                            $this->sendInvoiceToWhatsAppManual($transaction,$transaction->phone_number);
                            if ($this->wa_owner !== null) {
                                $this->sendInvoiceToWhatsAppOwner($transaction);
                            }
                            Log::info('Message sent successfully to ' . $transaction->phone_number);
                        } catch (\Exception $e) {
                            Log::error('Failed to send message: ' . $e->getMessage());
                        }
                    }

                    Log::info('Pembayaran ditemukan dan diperbarui:', ['transaction_id' => $transaction->trx_id]);
                } else {
                    Log::warning('Tidak ada transaksi yang cocok dengan jumlah:', ['amount' => $amount]);
                }
            }

            return response()->json(['status' => 'success', 'message' => 'Callback received'], 200);
        } else {
            // Kembalikan respons error jika konten tipe tidak sesuai
            return response()->json(['status' => 'error', 'message' => 'Invalid content type'], 400);
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
//        "testing"=> $this->is_production,
            'sign' => $sign,
        ];

        // Log the payload being sent to Digiflazz
        Log::info('Sending payload to Digiflazz', $payload);

        $response = Http::post('https://api.digiflazz.com/v1/transaction', $payload);

        if ($response->successful()) {
            $responseData = $response->json();

            // Log the response from Digiflazz
            Log::info('Received response from Digiflazz', $responseData);

            // Handle the response accordingly
            // Update the invoice status based on Digiflazz response if needed
            $status = $responseData['data']['status'];

            if ($status === 'Sukses') {
                $invoice->update(['status' => 'success', 'digiflazz_status' => $status]);
                Log::info('Invoice updated to success', ['invoice_id' => $invoice->trx_id, 'status' => $status]);
            } else if ($status === 'Pending' || $status === 'pending') {
                $invoice->update(['status' => 'pending', 'digiflazz_status' => $status]);
                Log::info('Invoice updated to pending', ['invoice_id' => $invoice->trx_id, 'status' => $status]);
            } else {
                $invoice->update(['status' => 'pending', 'digiflazz_status' => $status]);
                Log::info('Invoice updated to pending (default case)', ['invoice_id' => $invoice->id, 'status' => $status]);
            }
        } else {
            // Handle the error accordingly
            // Log the error or take appropriate actions
            $responseBody = json_decode($response->body(), true);

            Log::error('Failed to send request to Digiflazz', ['response' => $response->body()]);
            $this->sendErrorWhatsAppOwner($responseBody['data']['message']);
            $invoice->update(['status' => 'failed']);
        }
    }

    private function sendInvoiceToWhatsApp($transaction, $phone_number)
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

        $dataTrxArray = json_decode($transaction->data_trx, true);

        // Format the decoded JSON data into a readable string
        $formattedDataTrx = '';
        foreach ($dataTrxArray as $key => $value) {
            $formattedDataTrx .= ucwords(str_replace('_', ' ', $key)) . ": " . $value . "\n";
        }

        $message = "Halo {$transaction->user_name},\n\n";
        $message .= "Terima kasih telah menyelesaikan pembayaran. Transakasi anda akan segera diproses oleh admin.\n\n";
        $message .= "Berikut adalah detail transaksi Anda:\n\n";
        $message .= "ID Transaksi: *{$transaction->trx_id}*\n";
        $message .= "Status Transaksi: *".ucwords($transaction->status)."*\n";
        $message .= "{$formattedDataTrx}";
        if ($transaction->user_name) {
            $message .= "Username: *{$transaction->user_name}*\n";
        }
        $message .= "Nama Produk: *".strtoupper($transaction->product_name)."*\n";
        $message .= "Merek Produk: *".strtoupper($transaction->product_brand)."*\n";
        if ($transaction->fee > 0){
            $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Kode Unik: *" . $transaction->unique_code . "*\n";
        }
        if ($transaction->fee > 0){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->unique_code, 0, ',', '.') . "*\n";

        }
        $message .= "Status Pembayaran: *Pembayaran Berhasil*\n";
        $message .= "Metode Pembayaran: *{$transaction->payment_name}*\n";

        if ($transaction->no_va) {
            $message .= "Kode Pembayaran: *{$transaction->no_va}*\n";
        }

//        $message .= "\n\nLakukan pembayaran sebelum *{$formattedExpiredTime}*\n\n";
        $message .= "\n\nDetail Pembayaran : {$appUrl}/transaction/{$transaction->trx_id}\n\n";
        $message .= "Jika ada pertanyaan, silakan hubungi kami.\n\n";
        $message .= "Terima kasih,\n";
        $message .= "Tim {$appName}";

        $this->fonnteService->sendMessage([
            'target' => $phone_number,
            'message' => $message,
        ]);
    }

    private function sendInvoiceToWhatsAppManual($transaction, $phone_number)
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

        $formattedDataTrx = '';
        if (!is_null($transaction->data_trx)) {
            $dataTrxArray = json_decode($transaction->data_trx, true) ?? [];
            // Format the decoded JSON data into a readable string
            foreach ($dataTrxArray as $key => $value) {
                $formattedDataTrx .= ucwords(str_replace('_', ' ', $key)) . ": " . $value . "\n";
            }
        }

        $message = "Halo {$transaction->user_name},\n\n";
        $message .= "Terima kasih telah menyelesaikan pembayaran. Transakasi anda akan segera diproses oleh admin.\n\n";
        $message .= "Berikut adalah detail transaksi Anda:\n\n";
        $message .= "ID Transaksi: *{$transaction->trx_id}*\n";
        $message .= "Status Transaksi: *".ucwords($transaction->status)."*\n";
        if ($formattedDataTrx) {
            $message .= "\n\nDetail Order " .strtoupper($transaction->product_brand). " :\n";
            $message .= "{$formattedDataTrx}";
        }
        $message .= "Nama Produk: *".strtoupper($transaction->product_name)."*\n";
        $message .= "Merek Produk: *".strtoupper($transaction->product_brand)."*\n";
        if ($transaction->fee > 0){
            $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Kode Unik: *" . $transaction->unique_code . "*\n";
        }
        if ($transaction->fee > 0){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->unique_code, 0, ',', '.') . "*\n";

        }
        $message .= "Status Pembayaran: *Pembayaran Berhasil*\n";
        $message .= "Metode Pembayaran: *{$transaction->payment_name}*\n";

        if ($transaction->no_va) {
            $message .= "Kode Pembayaran: *{$transaction->no_va}*\n";
        }

//        $message .= "\n\nLakukan pembayaran sebelum *{$formattedExpiredTime}*\n\n";
        $message .= "\n\nDetail Pembayaran : {$appUrl}/transaction/{$transaction->trx_id}\n\n";
        $message .= "Jika ada pertanyaan, silakan hubungi kami.\n\n";
        $message .= "Terima kasih,\n";
        $message .= "Tim {$appName}";

        $this->fonnteService->sendMessage([
            'target' => $phone_number,
            'message' => $message,
        ]);
    }

    private function sendInvoiceToWhatsAppOwner($transaction)
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

        // Decode the JSON data
        $dataTrxArray = json_decode($transaction->data_trx, true);

        // Format the decoded JSON data into a readable string
        $formattedDataTrx = '';
        foreach ($dataTrxArray as $key => $value) {
            $formattedDataTrx .= ucwords(str_replace('_', ' ', $key)) . ": " . $value . "\n";
        }

        $message = "Halo {$appName}, ada orderan nih,\n\n";
        $message .= "Berikut adalah detail transaksi:\n\n";
        $message .= "ID Transaksi: *{$transaction->trx_id}*\n";
        $message .= "Status Transaksi: *".ucwords($transaction->status)."*\n";
        $message .= "Nama Produk: *".strtoupper($transaction->product_name)."*\n";
        $message .= "Merek Produk: *".strtoupper($transaction->product_brand)."*\n";
        if ($transaction->fee > 0){
            $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Kode Unik: *" . $transaction->unique_code . "*\n";
        }
        if ($transaction->fee > 0){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->fee, 0, ',', '.') . "*\n";
        }
        if ($transaction->unique_code){
            $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount+$transaction->unique_code, 0, ',', '.') . "*\n";

        }
        $message .= "Status Pembayaran: *Pembayaran Berhasil*\n";
        $message .= "Metode Pembayaran: *{$transaction->payment_name}*\n";

        if ($transaction->no_va) {
            $message .= "Kode Pembayaran: *{$transaction->no_va}*\n";
        }

        $message .= "\n\nDetail Order " .strtoupper($transaction->product_brand). " :\n";
        $message .= "{$formattedDataTrx}\n\n";
        $message .= "Terima kasih,\n";
        $message .= "Tim {$appName}";

        $this->fonnteService->sendMessage([
            'target' => $this->wa_owner,
            'message' => $message,
        ]);
    }

    private function sendErrorWhatsAppOwner($messageError): void
    {
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];

        $message = "Halo {$appName}, ada kegagalan sistem nih,\n\n";
        $message .= "{$messageError}\n";
        $message .= "Terima kasih";

        $this->fonnteService->sendMessage([
            'target' => $this->wa_owner,
            'message' => $message,
        ]);
    }
}
