<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\BankAccountMoota;
use App\Models\BankTransfer;
use App\Models\Brand;
use App\Models\DigiAuth;
use App\Models\Fonnte;
use App\Models\Transactions;
use App\Models\Tripay;
use App\Services\FonnteService;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Laravel\Reverb\Loggers\Log;

class BankAccountController extends Controller
{
    protected $api_key;
    protected $api_key_moota;
    protected $privateKey;
    protected $username;
    protected $apiKey;
    protected $is_production;
    protected $fonnteService;
    protected $wa_owner;
    public function __construct(FonnteService $fonnteService){
        $latestBT = BankTransfer::latest()->first();
        $latestFonnte = Fonnte::latest()->first();
        if ($latestFonnte) {
            $this->wa_owner = $latestFonnte->wa_owner;
        } else {
            $this->wa_owner = null;
        }
        $this->fonnteService = $fonnteService;
        $this->privateKey = Tripay::latest()->first()->private_key;
        $this->username = DigiAuth::latest()->first()->username;
        $this->apiKey = DigiAuth::latest()->first()->api_key;
        $this->is_production = DigiAuth::latest()->first()->is_production;
        if ($latestBT !== null){
            $this->api_key_moota = $latestBT->api_key;
        }else{
            $this->api_key_moota = null;
        }
    }

    public function index()
    {
        $latestBT = BankTransfer::latest()->first();
        $bankAccount = BankAccountMoota::all();
        $ipAddress = $this->getServerIP();
        return Inertia::render('Admin/BankAccount', [
            'latestBT' => $latestBT,
            'ipAddress' => $ipAddress,
            'bankAccount' => $bankAccount,
        ]);
    }
    public function store(Request $request)
    {
        BankTransfer::updateOrCreate([
            'api_key' => $request->get('api_key'),
        ]);

        return redirect()->back()->with('flash',['message' =>'Data saved successfully.','type' => 'success']);
    }
    public function getAllAccounts(Request $request)
    {
        // Set the API URL
        $url = 'https://mutasibank.co.id/api/v1/accounts';

        // Make the HTTP request to the external API
        $response = Http::withHeaders([
            'Authorization' => $this->api_key, // Get the Authorization header from the incoming request
        ])->get($url);

        // Check if the response is successful
        if ($response->successful()) {
            if ($response->successful()) {
                // Get the response data
                $data = $response->json();

                // Check if the data contains accounts
                if ($data['error'] === false && isset($data['data'])) {
                    foreach ($data['data'] as $accountData) {
                        // Save or update the account data
                        BankAccount::updateOrCreate(
                            ['id' => $accountData['id']], // Use the 'id' as the unique identifier
                            [
                                'bank' => $accountData['bank'],
                                'module' => $accountData['module'],
                                'account_no' => $accountData['account_no'],
                                'account_name' => $accountData['account_name'],
                                'balance' => $accountData['balance'] ?? 0,
                                'last_bot_activity' => $accountData['last_bot_activity'],
                                'next_bot_process' => $accountData['next_bot_process'],
                                'url_callback' => $accountData['url_callback'] ?? 'null',
                                'is_active' => $accountData['is_active']
                            ]
                        );
                    }
                }
            }

            // Return the response data
            return response()->json($response->json(), 200);
//            return redirect()->back()->with('flash',['message' =>'Data saved successfully.','type' => 'success']);
        } else {
            // Return an error response
            return response()->json(['error' => 'Failed to fetch accounts'], $response->status());
//            return redirect()->back()->with(['flash'=>['error' => 'Failed to fetch accounts']]);
        }
    }

    public function getBanksMoota(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $token = $this->api_key_moota; // Replace with your actual token

        $client = new Client();
        try {
            $response = $client->request('GET', 'https://app.moota.co/api/v2/bank', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . $token,
                ],
                'query' => [
                    'page' => $page,
                    'per_page' => $perPage,
                ],
            ]);

            $data = json_decode($response->getBody(), true);

            foreach ($data['data'] as $account) {
                $lastUpdate = Carbon::parse($account['last_update'])
                    ->setTimezone('Asia/Jakarta');
                $nextQueue = Carbon::parse($account['next_queue'])
                    ->setTimezone('Asia/Jakarta');
                BankAccountMoota::updateOrCreate(
                    ['account_number' => $account['account_number']],
                    [
                        'corporate_id' => $account['corporate_id'],
                        'username' => $account['username'],
                        'atas_nama' => $account['atas_nama'],
                        'balance' => $account['balance'] === '-' ? 0.00 : $account['balance'],
                        'bank_type' => $account['bank_type'],
                        'login_retry' => $account['login_retry'],
                        'date_from' => Carbon::parse($account['date_from'])
                            ->setTimezone('Asia/Jakarta'),
                        'date_to' => Carbon::parse($account['date_to'])
                            ->setTimezone('Asia/Jakarta'),
                        'meta' => json_encode($account['meta']),
                        'interval_refresh' => $account['interval_refresh'],
                        'next_queue' => $nextQueue,
                        'is_active' => $account['is_active'],
                        'in_queue' => $account['in_queue'],
                        'in_progress' => $account['in_progress'],
                        'is_big' => $account['is_big'] ?? false,
                        'is_auto_start' => $account['is_auto_start'] ?? true,
                        'recurred_at' => Carbon::parse($account['recurred_at'])
                            ->setTimezone('Asia/Jakarta'),
                        'status' => $account['status'],
                        'ip_address' => $account['ip_address'],
                        'ip_address_expired_at' => $account['ip_address_expired_at'],
                        'token' => $account['token'],
                        'bank_id' => $account['bank_id'],
                        'label' => $account['label'],
                        'last_update' => $lastUpdate,
                        'icon' => $account['icon'],
                    ]
                );
            }

//            return response()->json(['message' => 'Data successfully fetched and stored.']);
            return redirect()->back()->with('flash',['message' =>'Data saved successfully.','type' => 'success']);
        } catch (\Exception $e) {
//            return response()->json(['error' => 'Unauthenticated.'], 401);
            return redirect()->back()->with(['flash'=>['error' => 'Failed to fetch accounts']]);

        }
    }

    public function registerMutasiBank()
    {
        return redirect()->away(' https://app.moota.co?ref=UTGvJNyvvi');
    }

    function getServerIP() {
        if (isset($_SERVER['SERVER_ADDR'])) {
            return $_SERVER['SERVER_ADDR'];
        } else {
            return gethostbyname(gethostname());
        }
    }
    public function getAccountStatements(Request $request, $account_id): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'date_from' => 'required|date_format:Y-m-d',
            'date_to' => 'required|date_format:Y-m-d',
        ]);

        // Set the API URL
        $url = "https://mutasibank.co.id/api/v1/statements/{$account_id}";

        // Make the HTTP request to the external API
        $response = Http::withHeaders([
            'Authorization' => $this->api_key,
        ])->asForm()->post($url, [
            'date_from' => $validated['date_from'],
            'date_to' => $validated['date_to'],
        ]);

        // Check if the response is successful
        if ($response->successful()) {
            // Handle the successful response here
            return response()->json([
                'message' => 'Account statements retrieved successfully.',
                'type' => 'success',
                'data' => $response->json(),
            ], 200);
        } else {
            // Handle the error response here
            return response()->json([
                'message' => 'Failed to retrieve account statements.',
                'type' => 'error',
                'error' => $response->json(),
            ], $response->status());
        }
    }
    public function rerunCheckMutation($account_id)
    {
        $url = 'https://mutasibank.co.id/api/v1/rerun/' . $account_id;

        $headers = [
            'Authorization' => $this->api_key, // Ganti dengan token API Anda
        ];

        $client = new Client();
        try {
            $response = $client->get($url, [
                'headers' => $headers,
            ]);

            $result = json_decode($response->getBody()->getContents(), true);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Request failed', 'message' => $e->getMessage()], 500);
        }
    }
    public function matchTransaction(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
        ]);

        // Set the API URL
        $url = 'https://mutasibank.co.id/api/v1/match/1';

        // Make the HTTP request to the external API
        $response = Http::withHeaders([
            'Authorization' => $this->api_key,
            'Content-Type' => 'application/x-www-form-urlencoded',
        ])->asForm()->post($url, [
            'amount' => $validated['amount'],
        ]);

        // Check if the response is successful
        if ($response->successful()) {
            // Handle the successful response here
            return response()->json([
                'message' => 'Transaction matched successfully.',
                'type' => 'success',
                'data' => $response->json(),
            ], 200);
//            return redirect()->back()->with('flash', ['message' => 'Transaction matched successfully.', 'type' => 'success']);
        } else {
            // Handle the error response here
            return response()->json([
                'message' => 'Failed to match transaction.',
                'type' => 'error',
                'error' => $response->json(),
            ], $response->status());
//            return redirect()->back()->with('flash', ['message' => 'Failed to match transaction.', 'type' => 'error']);
        }
    }
    public function updateStatus(Request $request)
    {
//        $request->validate([
//            'id' => 'required|exists:bank_transfers,id',
//            'status' => 'required|boolean',
//        ]);

        $bankAccount = BankTransfer::findOrFail($request->get('id'));
        $bankAccount->status = $request->get('status');
        $bankAccount->save();
        \Illuminate\Support\Facades\Log::info($bankAccount);
        \Illuminate\Support\Facades\Log::info($request->get('status'));

        return redirect()->back()->with('flash', ['message' => 'Status updated successfully.', 'type' => 'success']);
    }

    public function getList()
    {
        $url = 'https://mesinotomatis.com/api/bank/';
        $headers = [
            'mo-userid' => 'C2605', // ganti dengan user ID Anda
            'mo-secret' => '06d8e394918c599ee7f319c27ac1b0cb8363b3b79021eacb00fd6da80d6af5a7', // ganti dengan secret Anda
        ];

        $data = [
            'inquiry' => 'GET.LIST',
        ];

        $client = new Client();
        $response = $client->post($url, [
            'headers' => $headers,
            'form_params' => $data,
        ]);

        $result = json_decode($response->getBody()->getContents(), true);

        if ($result['result'] == 'success') {
            foreach ($result['message'] as $bankData) {
                foreach ($bankData['rekening'] as $accountData) {
                    BankAccount::updateOrCreate(
                        ['account_no' => $accountData['account']],
                        [
                            'id' => $bankData['id'],
                            'bank' => $bankData['bank'],
                            'module' => $bankData['code'],
                            'account_no' => $accountData['account'],
                            'account_name' => $accountData['alias'],
                            'balance' => $accountData['balance'],
                            'name' => 'Bank '. strtoupper($bankData['bank']),
                            'url_callback' => $accountData['webhook'],
                            'is_active' => $bankData['status'] == "1",
                        ]
                    );
                }
            }
        }

        return response()->json($result);
    }

    public function checkMutation(Request $request, $amount): \Illuminate\Http\JsonResponse
    {
        try {
            $transaction = $request->get('transaction');
            $url = 'https://mesinotomatis.com/api/bank/';
            $headers = [
                'mo-userid' => 'C2605', // ganti dengan user ID Anda
                'mo-secret' => '06d8e394918c599ee7f319c27ac1b0cb8363b3b79021eacb00fd6da80d6af5a7', // ganti dengan secret Anda
            ];

            $data = [
                'inquiry' => 'CHECK.MUTATION',
                'bank' => $request->input('bank'),
                'account' => $request->input('account'),
                'reference' => $request->input('reference'),
                'key' => $request->input('key'),
            ];

            $desc = $request->input('desc');

            $client = new Client();

            Log::info('Making API call to check mutation');
            $response = $client->post($url, [
                'headers' => $headers,
                'form_params' => $data,
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            if ($result['result'] === 'success') {
                $filteredMutations = array_filter($result['message'], function ($mutation) use ($amount, $desc) {
                    $amountMatches = $mutation['amount'] == $amount;
                    $descMatches = !$desc || str_contains($mutation['description'], $desc);
                    $typeMatches = $mutation['type'] == 'K';

                    if ($descMatches) {
                        return $amountMatches && $descMatches;
                    } else {
                        return $amountMatches;
                    }
                });
                Log::info('Received response from API');

                if (!empty($filteredMutations)) {
                    // Assuming you have a Transaction model with a status field
                    $transaction = Transactions::find($transaction);
                    if ($transaction) {
                        $transaction->payment_status = 'PAID';
                        $transaction->status = 'process';
                        $transaction->save();
                    }

                    return response()->json([
                        'result' => 'success',
                        'message' => array_values($filteredMutations)
                    ]);
                } else {
                    return response()->json([
                        'result' => 'success',
                        'message' => []
                    ]);
                }
            } else {
                return response()->json($result);
            }

        } catch (\Exception $e) {
            Log::error('Error occurred while checking mutation: ' . $e->getMessage());
            return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
        }
    }

    public function getMutations(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $transactionId = $request->get('transaction');
            $type = 'CR';
            $acc_no = $request->input('bank');
            $start_date = $request->input('start_date');
            $end_date = $request->input('end_date');
            $tag = $request->input('tag');
            $page = $request->input('page', 1);
            $per_page = $request->input('per_page', 10);
            $token = $this->api_key_moota; // Replace with your actual token

            // Retrieve the bank account from the database
            $bank = BankAccountMoota::where('account_number', $acc_no)->first();
            if (!$bank) {
                Log::error('Bank account not found: ' . $acc_no);
                return response()->json(['error' => 'Bank account not found.'], 404);
            }

            // Retrieve the transaction
            $transaction = Transactions::find($transactionId);
            if (!$transaction) {
                Log::error('Transaction not found: ' . $transactionId);
                return response()->json(['error' => 'Transaction not found.'], 404);
            }

            $amount = $transaction->amount+$transaction->unique_code;
            $desc = $transaction->description;

            // Setup the client and make the API request
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', 'https://app.moota.co/api/v2/mutation', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . $token,
                ],
                'query' => [
                    'type' => $type,
                    'bank' => $bank->bank_id,
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'tag' => $tag,
                    'page' => $page,
                    'per_page' => $per_page,
                ],
            ]);

            // Decode the response
            $data = json_decode($response->getBody(), true);

            // Check if data is valid and not null
            if (isset($data['data']) && is_array($data['data'])) {
                $filteredMutations = array_filter($data['data'], function ($mutation) use ($amount, $desc) {
                    $amountMatches = intval($mutation['amount']) == intval($amount);
                    $descMatches = !$desc || stripos($mutation['description'], $desc) !== false;
                    return $amountMatches;
                });

                Log::info('Received response from API: ' . json_encode($filteredMutations));

                if (!empty($filteredMutations)) {
                    $process = Brand::where('brand_name', $transaction->product_brand)->first();

                    // Update the transaction status
                    $transaction->payment_status = 'PAID';
                    $transaction->status = 'process';
                    $transaction->save();
                    if ($process->processed_by === 'digiflazz') {
                        try {
                            $this->sendInvoiceToWhatsApp($transaction,$transaction->phone_number);
                            \Illuminate\Support\Facades\Log::info('Message sent successfully to ' . $transaction->phone_number);
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

                    return response()->json([
                        'result' => 'success',
                        'message' => array_values($filteredMutations)
                    ]);
                } else {
                    return response()->json([
                        'result' => 'success',
                        'amount' => $amount,
                        'message' => $data
                    ]);
                }
            } else {
                Log::warning('Invalid data received from Moota API: ' . json_encode($data));
                return response()->json(['error' => 'Invalid data received from Moota API.'], 500);
            }
        } catch (\Exception $e) {
            Log::error('An error occurred while fetching mutations: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching mutations.'], 500);
        }
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
        \Illuminate\Support\Facades\Log::info('Sending payload to Digiflazz', $payload);

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

}
