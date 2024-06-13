<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'category_id';
    protected $fillable = ['category_id','code','category_name','category_status'];

    public function brands()
    {
        return $this->hasMany(Brand::class, 'category_id', 'category_id');
    }
}
