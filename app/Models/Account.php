<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'accounts';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the primary key.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'type',
        'email',
        'password',
        'profile',
        'pin',
        'details',
        'duration',
        'duration_left',
        'sold',
        'trx_id',
        'product_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'string',
        'details' => 'array',
        'duration' => 'integer',
        'duration_left' => 'integer',
        'sold' => 'boolean',
    ];

    /**
     * Get the product associated with the account.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the category associated with the account.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Scope a query to only include accounts that are unsold.
     */
    public function scopeUnsold($query)
    {
        return $query->where('sold', false);
    }

    /**
     * Scope a query to find accounts by type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Encrypt the password before saving to the database.
     *
     * @param string $value
     */
//    public function setPasswordAttribute($value)
//    {
//        $this->attributes['password'] = bcrypt($value);
//    }


    protected static function boot()
    {
        parent::boot();

        // When an account is deleted
        static::deleted(function ($account) {
            $product = $account->product; // Assuming 'product' is the relationship

            if ($product && $product->accounts()->where('sold', false)->count() === 0) {
                $product->update(['product_status' => false]);
            }
        });

        // When an account is updated (e.g., sold status changes)
        static::updated(function ($account) {
            // Check if the 'sold' attribute has changed
            if ($account->wasChanged('sold')) {
                $product = $account->product;

                if ($product) {
                    // If no unsold accounts remain, update product_status to false
                    if ($product->accounts()->where('sold', false)->count() === 0) {
                        $product->update(['product_status' => false]);
                    } else {
                        // Otherwise, ensure product_status is true
                        $product->update(['product_status' => true]);
                    }
                }
            }
        });
    }

}
