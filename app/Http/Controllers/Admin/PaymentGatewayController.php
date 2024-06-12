<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentGateway;
use App\Models\Tripay;
use App\Models\TripayPaymentChannel;
use App\Models\Xendit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PaymentGatewayController extends Controller
{
    protected $url;

    public function __construct()
    {
        $latest = Tripay::latest()->first();
        if ($latest) {
            if ($latest->is_production === 0) {
                $this->url = "https://tripay.co.id/api-sandbox/";
            } elseif ($latest->is_production === 1) {
                $this->url = "https://tripay.co.id/api/";
            }
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tripay = Tripay::latest()->first();
        $tripayPaymentChannel = TripayPaymentChannel::all();
        $paymentGateways = PaymentGateway::all();
        $ipAddress = $this->getServerIP();
        $xendit = Xendit::latest()->first();
        return Inertia::render('Admin/PaymentGateway/PaymentGateway', [
            'tripay' => $tripay,
            'tripayPaymentChannel' => $tripayPaymentChannel,
            'paymentGateways' => $paymentGateways,
            'ipAddress' => $ipAddress,
            'xendit' => $xendit,
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
            'is_production' => $request->get('is_production'),
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
            return redirect()->back()->with(['flash' => ['success' => false, 'message' => 'API key not found']]);
        }

        // Make the API request with the Authorization header
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $tripay->api_key,
        ])->get($this->url . 'merchant/payment-channel');

        // Check if the API request was successful
        if ($response->successful()) {
            $responseData = $response->json();

            // Check if the 'data' key exists in the response and is an array
            if (isset($responseData['data']) && is_array($responseData['data'])) {
                $paymentChannels = $responseData['data'];

                // Retrieve all existing payment channel codes from the database
                $existingChannels = TripayPaymentChannel::pluck('code')->all();

                // Create an array to store the codes of channels from the API response
                $receivedCodes = [];

                // Iterate over each payment channel and save it to the database
                foreach ($paymentChannels as $channel) {
                    // Store the received channel codes
                    $receivedCodes[] = $channel['code'];

                    // Update or create the payment channel
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

                // Mark inactive records that are not in the API response
                TripayPaymentChannel::whereNotIn('code', $receivedCodes)->update(['active' => false]);

//                return response()->json([
//                    'success' => true,
//                    'message' => 'Payment channels fetched and saved successfully',
//                    'api_key' => $tripay->api_key,
//                    'data' => $paymentChannels
//                ]);
                return redirect()->back()->with(['flash'=>['success' => true,'message' => 'Payment channels fetched and saved successfully']]);
            } else {
                // Handle the case where the expected data structure is not found
                return redirect()->back()->with(['flash' => ['success' => false, 'message' => 'Unexpected response structure']]);
            }
        } else {
            // Handle the case where the API request failed
            return redirect()->back()->with(['flash' => ['success' => false, 'message' => 'Failed to fetch payment channels']]);
        }
    }

    public function updateStatus(Request $request, $id): \Illuminate\Http\RedirectResponse
    {
        // Validate the request to ensure 'status' field is present
        $request->validate([
            'status' => 'required|boolean',
        ]);

        // Find the specified payment gateway by ID
        $gateway = PaymentGateway::findOrFail($id);

        if ($request->status) {
            // If the new status is true, set all other gateways to false
            PaymentGateway::where('payment_gateway_id', '!=', $id)->update(['payment_gateway_status' => false]);
        }

        // Update the status of the specified payment gateway
        $gateway->payment_gateway_status = $request->status;
        $gateway->save();

        // Optionally, you can return a response or redirect
        return redirect()->back()->with(['flash' => ['success' => true, 'message' => 'Payment gateway status updated successfully']]);
    }

    function getServerIP() {
        if (isset($_SERVER['SERVER_ADDR'])) {
            return $_SERVER['SERVER_ADDR'];
        } else {
            return gethostbyname(gethostname());
        }
    }

    public function registerTripay()
    {
        return redirect()->away('https://tripay.co.id/?ref=TP1084');
    }

}
