<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fonnte;
use App\Services\FonnteService;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhatsappGatewayController extends Controller
{
    protected $acc_token;
    protected $wa_owner;
    protected $fonnteService;

    public function __construct(FonnteService $fonnteService){
        $latestFonnte = Fonnte::latest()->first();
        $this->fonnteService = $fonnteService;

        if ($latestFonnte) {
            $this->acc_token = $latestFonnte->acc_token;
            $this->wa_owner = $latestFonnte->wa_owner;
        } else {
            $this->acc_token = null;
            $this->wa_owner = null;
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $device = $this->getDevices();
        return Inertia::render('Admin/WhatsappGateway',[
            'acc_token' => $this->acc_token,
            'wa_owner' => $this->wa_owner,
            'devices' => $device
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validasi input
            $validatedData = $request->validate([
                'acc_token' => 'required|string|max:255',
                'wa_owner' => 'required|string|max:255',
            ]);

            // Membuat record baru dalam tabel fonntes
            $fonnte = Fonnte::create([
                'acc_token' => $validatedData['acc_token'],
                'wa_owner' => $validatedData['wa_owner'],
            ]);

            // Kembalikan respons sukses
            return redirect()->back()->with(['flash' => ['success' => 'Successfully Added!']]);
        } catch (\Exception $e) {
            // Menangani kesalahan dan kembalikan respons gagal
            return redirect()->back()->withErrors(['error' => 'Failed to add the record. '. $e->getMessage()]);
        }
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

    public function getDevices()
    {
        // Initialize Guzzle client
        $client = new Client();

        try {
            // Perform the request
            $response = $client->request('POST', 'https://api.fonnte.com/get-devices', [
                'headers' => [
                    'Authorization' => $this->acc_token, // Replace 'TOKEN' with your actual token
                ],
            ]);

            // Get the response body
            $body = $response->getBody();
            $content = $body->getContents();
            $data = json_decode($content, true);

            // Return or process the response as needed
            return $data;
//            return response()->json(json_decode($content, true));

        } catch (\Exception $e) {
            // Handle exception
//            return response()->json([
//                'error' => 'Request failed',
//                'message' => $e->getMessage(),
//            ], 500);
            return $e->getMessage();
        }
    }

    public function sendMessage(Request $request): \Illuminate\Http\RedirectResponse
    {
//        $request->validate([
//            'target' => $this->wa_owner,
//            'message' => 'Test Whatsapp Gateway Message',
//            // Add other validations as needed
//        ]);
        $data = [
            'target' => $this->wa_owner,
            'message' => 'Test Whatsapp Gateway Message',
        ];

        try {
            $this->fonnteService->sendMessage($data);

            return redirect()->back()->with(['flash' => ['success' => 'Successfully test send message to '. $data->target]]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to test send message. '. $e->getMessage()]);
        }
    }
}
