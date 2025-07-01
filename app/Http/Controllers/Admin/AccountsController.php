<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Debugging: Menampilkan request untuk memeriksa input
        Log::info('Incoming request data:', $request->all());

        // Validasi data input
        $validatedData = $request->validate([
            'type' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
            'profile' => 'required|string|max:255',
            'pin' => 'required|string|max:255',
            'details' => 'nullable|array',
            'duration' => 'required|integer|min:1', // Validasi duration sebagai integer
            'product_id' => 'required|integer|exists:products,id',
        ]);

        // Jika duration bukan integer, parsing ke integer
        if (!is_int($validatedData['duration'])) {
            $validatedData['duration'] = (int) $validatedData['duration'];
            // Debugging: Menampilkan perubahan nilai duration
            Log::info('Parsed duration to integer:', (array)$validatedData['duration']);
        }

        // Membuat data account baru
        try {
            $account = Account::create([
                'id' => Str::uuid(),
                'type' => $validatedData['type'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'], // Enkripsi password
                'profile' => $validatedData['profile'],
                'pin' => $validatedData['pin'],
                'details' => $validatedData['details'] ?? null,
                'duration' => $validatedData['duration'],
                'duration_left' => $validatedData['duration'],
                'product_id' => $validatedData['product_id'],
            ]);

            // Debugging: Menampilkan data yang berhasil disimpan
            Log::info('Account successfully created:');

            // Kembalikan respons sukses
            return response()->json([
                'message' => 'Account berhasil ditambahkan.',
            ], 201);

        } catch (\Exception $e) {
            // Debugging: Menangkap error dan menampilkan pesan error
            Log::error('Error while creating account:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Terjadi kesalahan saat membuat account.',
                'error' => $e->getMessage(),
            ], 500);
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
}
