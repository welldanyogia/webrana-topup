<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'bank',
        'module',
        'account_no',
        'account_name',
        'balance',
        'last_bot_activity',
        'next_bot_process',
        'url_callback',
        'is_active'
    ];

    protected $casts = [
        'last_bot_activity' => 'datetime',
        'next_bot_process' => 'datetime',
        'is_active' => 'boolean',
    ];
}
