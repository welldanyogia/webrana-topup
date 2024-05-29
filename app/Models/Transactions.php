<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transactions';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'trx_id';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'trx_id',
        'user_id',
        'buyer_id', // Tambahkan buyer_id ke fillable attributes
        'server_id',
        'user_name',
        'phone_number',
        'email',
        'buyer_sku_code',
        'product_brand',
        'product_name',
        'product_price',
        'amount',
        'fee',
        'status',
        'payment_method',
        'payment_name',
        'no_va',
        'no_rekening',
        'payment_status',
        'expired_time',
        'qr_url',
        'qr_string',
        'digiflazz_status'
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
