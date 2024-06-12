<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\BankTransfer;
use App\Models\Transactions;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Laravel\Reverb\Loggers\Log;

class BankAccountController extends Controller
{
    protected $api_key;
    public function __construct(){
        $latestBT = BankTransfer::latest()->first();
        if ($latestBT !== null){
            $this->api_key = $latestBT->api_key;
        }else{
            $this->api_key = null;
        }
    }

    public function index()
    {
        $latestBT = BankTransfer::latest()->first();
        $bankAccount = BankAccount::all();
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

    public function registerMutasiBank()
    {
        return redirect()->away('https://app.mutasibank.co.id/reff/UlrFgk28');
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
}
