<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'type_id';

    protected $fillable = ['type_id','type_name','type_status'];

    public function products()
    {
        return $this->hasMany(Product::class, 'type_id', 'type_id');
    }
}
