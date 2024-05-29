<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $latestTransaction = Transactions::latest()->take(5)->get();
        $allTransaction = Transactions::all();

        return Inertia::render('TransactionHistory', [
            'latestTransaction' => $latestTransaction,
            'allTransaction' => $allTransaction
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

    /**
     * Search transactions by ID.
     */
    public function search(Request $request)
    {
        $request->validate([
            'trx_id' => 'required|string'
        ]);

        $transaction = Transactions::where('trx_id', $request->trx_id)->first();
        $message = $transaction ? null : 'Transaction not found.';


        return Inertia::render('TransactionHistory', [
            'latestTransaction' => Transactions::latest()->take(5)->get(),
            'searchResult' => $transaction,
            'searchMessage' => $message,
        ]);
    }
}
