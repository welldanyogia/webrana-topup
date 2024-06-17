<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccountMoota extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'atas_nama',
        'balance',
        'account_number',
        'bank_type',
        'login_retry',
        'date_from',
        'date_to',
        'meta',
        'interval_refresh',
        'next_queue',
        'is_active',
        'in_queue',
        'in_progress',
        'is_big',
        'is_auto_start',
        'recurred_at',
        'status',
        'ip_address',
        'ip_address_expired_at',
        'token',
        'bank_id',
        'label',
        'last_update',
        'icon',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
        'date_from' => 'datetime',
        'date_to' => 'datetime',
        'meta' => 'array',
        'next_queue' => 'datetime',
        'is_active' => 'boolean',
        'is_big' => 'boolean',
        'is_auto_start' => 'boolean',
        'recurred_at' => 'datetime',
        'ip_address_expired_at' => 'datetime',
        'last_update' => 'datetime',
    ];
}
