<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\DigiAuth;
use App\Models\Transactions;
use App\Models\Tripay;
use App\Services\FonnteService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use function Termwind\render;

class TransactionController extends Controller
{
    protected $privateKey;
    protected $username;
    protected $wa_owner;
    protected $apiKey;
    protected $is_production;
    protected $fonnteService;

    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
        if (Tripay::latest()->first()) {
            $this->privateKey = Tripay::latest()->first()->private_key;
        }
        if (DigiAuth::latest()->first()) {
            $this->username = DigiAuth::latest()->first()->username;
            $this->apiKey = DigiAuth::latest()->first()->api_key;
            $this->is_production = DigiAuth::latest()->first()->is_production;
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transactions::all();
        $transactionsPaginate = Transactions::orderBy('created_at', 'desc')->paginate(20);
        return Inertia::render('Admin/Transaction',[
            'transactions' => $transactions,
            'transactionsPaginate' => $transactionsPaginate
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => ['required', 'string', 'in:pending,process,success,failed'],
        ]);

        $transaction = Transactions::findOrFail($id);
        $transaction->update(['status' => $request->status]);

        $process = Brand::where('brand_name', $transaction->product_brand)->first();
        Log::info('brand ' . $process . $transaction->product_brand);
        if ($request->status === 'process' && $process->processed_by === 'digiflazz') {
            try {
                $this->sendInvoiceToWhatsApp($transaction,$transaction->phone_number);
                Log::info('Message sent successfully to ' . $transaction->phone_number);
            } catch (\Exception $e) {
                Log::error('Failed to send message '. $transaction->phone_number. ' : ' . $e->getMessage()."\n" .$transaction);
            }
            $this->processDigiflazzTopup($transaction);
        }
        if ($request->status === 'process' && $process->processed_by === 'manual') {
            try {
                $this->sendInvoiceToWhatsAppManual($transaction,$transaction->phone_number);
//                $this->sendInvoiceToWhatsAppOwner($transaction);
                Log::info('Message sent successfully to ' . $transaction->phone_number);
            } catch (\Exception $e) {
                Log::error('Failed to send message '. $transaction->phone_number. ' : ' . $e->getMessage()."\n" .$transaction);
                Log::error('Failed to send message: ' . $e->getMessage());
            }
        }
        if ($request->status === 'success') {
            try {
                $this->sendSuccessInvoiceToWhatsApp($transaction,$transaction->phone_number);
//                $this->sendInvoiceToWhatsAppOwner($transaction);
                Log::info('Message sent successfully to ' . $transaction->phone_number);
            } catch (\Exception $e) {
                Log::error('Failed to send message: ' . $e->getMessage());
            }
        }

        return redirect()->back()->with('success', 'Transaction status updated successfully.');
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
            Log::error('Failed to send request to Digiflazz', ['response' => $response->body()]);
            $invoice->update(['status' => 'failed']);
        }
    }

    private function sendInvoiceToWhatsApp($transaction, $phone_number): void
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
        $message .= "Harga Produk: *Rp" . number_format($transaction->product_price, 0, ',', '.') . "*\n";
        $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount, 0, ',', '.') . "*\n";
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

    private function sendInvoiceToWhatsAppManual($transaction, $phone_number): void
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
        $message .= "\n\nDetail Order " .strtoupper($transaction->product_brand). " :\n";
        $message .= "{$formattedDataTrx}\n\n";
        $message .= "Nama Produk: *".strtoupper($transaction->product_name)."*\n";
        $message .= "Merek Produk: *".strtoupper($transaction->product_brand)."*\n";
        $message .= "Harga Produk: *Rp" . number_format($transaction->product_price, 0, ',', '.') . "*\n";
        $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount, 0, ',', '.') . "*\n";
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

    private function sendSuccessInvoiceToWhatsApp($transaction, $phone_number)
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

        $message = "Halo {$transaction->user_name},\n\n";
        $message .= "Transakasi anda dengan ID Transakasi *{$transaction->trx_id}* telah berhasil.\n";
        $message .= "Silahkan periksa akun anda\n\n";

        $message .= "\n\nDetail Transaksi : {$appUrl}/transaction/{$transaction->trx_id}\n\n";
        $message .= "Jika ada pertanyaan, silakan hubungi kami.\n\n";
        $message .= "Terima kasih,\n";
        $message .= "Tim {$appName}";

        $this->fonnteService->sendMessage([
            'target' => $phone_number,
            'message' => $message,
        ]);
    }


    private function sendInvoiceToWhatsAppOwner($transaction): void
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

//         Decode the JSON data
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
        $message .= "Harga Produk: *Rp" . number_format($transaction->product_price, 0, ',', '.') . "*\n";
        $message .= "Biaya Admin: *Rp" . number_format($transaction->fee, 0, ',', '.') . "*\n";
        $message .= "Total Pembayaran: *Rp" . number_format($transaction->amount, 0, ',', '.') . "*\n";
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

}
