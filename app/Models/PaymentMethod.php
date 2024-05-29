<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'payment_method_id';

    protected $fillable = ['payment_method_id','payment_method_name', 'payment_gateway_id','payment_method_status','payment_method_type'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
