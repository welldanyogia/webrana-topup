<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentGateway extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'payment_gateway_id';
    protected $fillable = ['payment_gateway_id', 'payment_gateway_name', 'payment_gateway_description'];

    public static function boot()
    {
        parent::boot();

        // Ensure only one active payment gateway
        static::saving(function ($model) {
            if ($model->payment_gateway_status) {
                static::where('payment_gateway_status', true)->update(['payment_gateway_status' => false]);
            }
        });
    }
    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class, 'payment_gateway_id', 'payment_gateway_id');
    }
}
