<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

//    protected $keyType = 'string';
    public $incrementing = true;
    protected $primaryKey = 'id';

    protected $fillable = [
        'product_name',
        'brand_id',
        'type_id',
        'seller_name',
        'price',
        'selling_price',
        'buyer_sku_code',
        'buyer_product_status',
        'seller_product_status',
        'unlimited_stock',
        'stock',
        'multi',
        'start_cut_off',
        'end_cut_off',
        'desc',
        'product_status'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'brand_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id', 'type_id');
    }
}
