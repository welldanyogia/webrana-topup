<?php

namespace App\Services;

use App\Models\Fonnte;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{

    protected $acc_token;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $latestFonnte = Fonnte::latest()->first();

        if ($latestFonnte) {
            $this->acc_token = $latestFonnte->acc_token;
        } else {
            $this->acc_token = null;
        }
    }

    public function sendMessage(array $data)
    {
        $tokens = $this->getDevices();

        if (empty($tokens)) {
            throw new \Exception('No available tokens to send the message.');
        }

        // Select a random token from the list
        $token = $tokens[array_rand($tokens)];

        $response = Http::withHeaders([
            'Authorization' => $token,
        ])->post('https://api.fonnte.com/send', $data);

        if ($response->failed()) {
            throw new \Exception($response->json()['reason']);
        }

        return $response->json();
    }

    public function getDevices()
    {
        // Initialize Guzzle client
        $client = new Client();

        try {
            // Perform the request
            $response = $client->request('POST', 'https://api.fonnte.com/get-devices', [
                'headers' => [
                    'Authorization' => $this->acc_token, // Replace with your actual authorization token
                ],
            ]);

            // Get the response body
            $body = $response->getBody();
            $content = $body->getContents();
            $data = json_decode($content, true);

            // Extract tokens from the response
            $tokens = [];
            if (isset($data['data']) && is_array($data['data'])) {
                foreach ($data['data'] as $device) {
                    if (isset($device['token']) && $device['status'] === 'connect') {
                        $tokens[] = $device['token'];
                    }
                }
            }

            return $tokens;

        } catch (\Exception $e) {
            // Handle exception
            Log::error('Failed to retrieve devices: ' . $e->getMessage());
            return [];
        }
    }
}
