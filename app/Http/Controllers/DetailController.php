<?php

namespace App\Http\Controllers;

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
        $brand = Brand::where('brand_id', $id)
            ->with(['products' => function ($query) {
                $query->select('*')
                    ->join('types', 'products.type_id', '=', 'types.type_id')
                    ->orderBy('products.selling_price', 'ASC'); // Mengurutkan produk berdasarkan harga termurah
            }])
            ->first();
        $formInputs = FormInputBrand::where('brand_id',$id)->with('options')->get();

        $activeChannels = TripayPaymentChannel::where('active', 1)->get();

        $groupedChannels = $activeChannels->groupBy('group');

        $sortedGroupedChannels = $groupedChannels->map(function ($group) {
            return $group->sortBy(function ($channel) {
                return $channel->total_fee_flat + ($channel->total_fee_percent*100);
            });
        });
        $sortedGroupedChannels = $sortedGroupedChannels->sortBy(function ($group) {
            return $group->first()->total_fee_flat + ($group->first()->total_fee_percent);
        });

        return Inertia::render('DetailProduct', [
            'brand' => $brand,
            'formInputs' => $formInputs,
            'sortedGroupedChannels' => $sortedGroupedChannels,
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
