<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\BankTransfer;
use App\Models\Brand;
use App\Models\FormInputBrand;
use App\Models\TripayPaymentChannel;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $latestBT = BankTransfer::latest()->first();
        $brand = Brand::where('brand_id', $id)
            ->with(['products' => function ($query) {
                $query->select('*')
                    ->join('types', 'products.type_id', '=', 'types.type_id')
                    ->orderBy('products.selling_price', 'ASC'); // Mengurutkan produk berdasarkan harga termurah
            }])
            ->first();
        $formInputs = FormInputBrand::where('brand_id', $id)->with('options')->get();

        $activeChannels = TripayPaymentChannel::where('active', 1)->get();

        $groupedChannels = $activeChannels->groupBy('group');

        $sortedGroupedChannels = $groupedChannels->map(function ($group) {
            return $group->sortBy(function ($channel) {
                return $channel->total_fee_flat + ($channel->total_fee_percent * 100);
            });
        });
        $bankTransfers = BankAccount::where('is_active', 1)->get()->map(function ($bank) {
            return (object)[
                'id' => $bank->id,
                'name' => $bank->bank,
                'icon_url' => '/' . strtolower($bank->bank) . '.png', // Ensure you have an appropriate icon for each bank
                'total_fee_flat' => 0, // Assuming no flat fee for bank transfer
                'total_fee_percent' => 0, // Assuming no percentage fee for bank transfer
            ];
        });
        if ($latestBT) {
            if ($latestBT->status) {
                $sortedGroupedChannels['Bank Transfer'] = $bankTransfers;
            }
        }

        $sortedGroupedChannels = $sortedGroupedChannels->sortBy(function ($group) {
            return $group->first()->total_fee_flat + ($group->first()->total_fee_percent);
        });


        // Ensure all groups are arrays
        $sortedGroupedChannels = $sortedGroupedChannels->map(function ($group) {
            return $group->values();
        });


        return Inertia::render('DetailProduct', [
            'brand' => $brand,
            'formInputs' => $formInputs,
            'sortedGroupedChannels' => $sortedGroupedChannels,
//            'bankTransfer' => $bankTransfer,
        ]);
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
