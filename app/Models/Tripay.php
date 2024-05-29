<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tripay extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_code',
        'api_key',
        'private_key'
    ];
}
