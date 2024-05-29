<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tripay;
use App\Models\TripayPaymentChannel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PaymentGatewayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tripay = Tripay::latest()->first();
        $tripayPaymentChannel = TripayPaymentChannel::all();
        return Inertia::render('Admin/PaymentGateway', [
            'tripay' => $tripay,
            'tripayPaymentChannel' => $tripayPaymentChannel,
            'flash' => session('flash')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Tripay::updateOrCreate([
            'api_key' => $request->get('api_key_tripay'),
            'private_key' => $request->get('private_key_tripay'),
            'merchant_code' => $request->get('merchant_code_tripay'),
        ]);

        return redirect()->back()->with('flash',['message' =>'Data saved successfully.','type' => 'success']);
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

    public function paymentChannel()
    {
        // Retrieve the latest Tripay entry from the database
        $tripay = Tripay::latest()->first();

        // Check if the tripay entry is found
        if (!$tripay) {
            return redirect()->back()->with(['flash'=>['success' => false, 'message' => 'API key not found']]);
        }

        // Make the API request with the Authorization header
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $tripay->api_key,
        ])->get('https://tripay.co.id/api-sandbox/merchant/payment-channel');

        // Check if the API request was successful
        if ($response->successful()) {
            $responseData = $response->json();

            // Check if the 'data' key exists in the response and is an array
            if (isset($responseData['data']) && is_array($responseData['data'])) {
                $paymentChannels = $responseData['data'];

                // Iterate over each payment channel and save it to the database
                foreach ($paymentChannels as $channel) {
                    TripayPaymentChannel::updateOrCreate(
                        ['code' => $channel['code']], // Use 'code' as the unique identifier
                        [
                            'group' => $channel['group'],
                            'name' => $channel['name'],
                            'type' => $channel['type'],
                            'fee_merchant_flat' => $channel['fee_merchant']['flat'],
                            'fee_merchant_percent' => $channel['fee_merchant']['percent'],
                            'fee_customer_flat' => $channel['fee_customer']['flat'],
                            'fee_customer_percent' => $channel['fee_customer']['percent'],
                            'total_fee_flat' => $channel['total_fee']['flat'],
                            'total_fee_percent' => $channel['total_fee']['percent'],
                            'minimum_fee' => $channel['minimum_fee'],
                            'maximum_fee' => $channel['maximum_fee'],
                            'icon_url' => $channel['icon_url'],
                            'active' => $channel['active']
                        ]
                    );
                }

//                return response()->json([
//                    'success' => true,
//                    'message' => 'Payment channels fetched and saved successfully',
//                    'api_key' => $tripay->api_key,
//                    'data' => $paymentChannels
//                ]);
                return redirect()->back()->with(['flash'=>['success' => true,'message' => 'Payment channels fetched and saved successfully']]);
            } else {
                // Handle the case where the expected data structure is not found
//                return response()->json([
//                    'success' => false,
//                    'message' => 'Unexpected response structure',
//                    'response' => $responseData,
//                ], 500);
                return redirect()->back()->with(['flash'=>['success'=>false,'message'=> 'Unexpected response structure']]);
            }
        } else {
//            return response()->json([
//                'success' => false,
//                'message' => 'Failed to fetch payment channels',
//                'error' => $response->json(),
//            ], $response->status());
            return redirect()->back()->with(['flash'=>['success'=>false,'message'=> 'Failed to fetch payment channels']]);
        }
    }
}
