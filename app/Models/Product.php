<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function checkAndSetAccountStatus()
    {
        // Log product type and associated accounts count
        Log::info('Checking account status for product ID: ' . $this->id);
        Log::info('Product type: ' . $this->type->type_name);
        Log::info('Accounts count: ' . $this->accounts->count());

        // Check if the product type is 'akun' and if there are no accounts associated
        if ($this->type->type_name === 'akun' || $this->type->type_name === 'AKUN') {
            if ($this->accounts->isEmpty()) {
                // Log the update action
                Log::info('No accounts found. Updating product status to false for product ID: ' . $this->id);

                // Update product status to false if no accounts are associated
                $this->update([
                    'product_status' => false,
                ]);

                // Log the updated product status
                Log::info('Product status updated to false for product ID: ' . $this->id);
            }
        }
    }

    public function scopeWithUpdatedStatus($query)
    {
        return $query->with('accounts')->get()->map(function ($product) {
            if ($product->accounts->where('sold', false)->count() === 0) {
                $product->updateQuietly(['product_status' => false]);
            }
            return $product;
        });
    }


    protected static function boot()
    {
        parent::boot();

        // Check product status when a product is created
        static::created(function ($product) {
            // Check if the product has any unsold accounts
            if ($product->accounts()->where('sold', false)->count() === 0) {
                $product->update(['product_status' => false]);
            }
        });
    }






}
