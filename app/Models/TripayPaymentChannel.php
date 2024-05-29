<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripayPaymentChannel extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'code',
        'name',
        'type',
        'fee_merchant_flat',
        'fee_merchant_percent',
        'fee_customer_flat',
        'fee_customer_percent',
        'total_fee_flat',
        'total_fee_percent',
        'minimum_fee',
        'maximum_fee',
        'icon_url',
        'active'
    ];
}
