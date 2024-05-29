<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'brand_id';

    protected $fillable = ['brand_id','brand_name', 'category_id','brand_status','brand_desc','image_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }

    public function inputForm()
    {
        return $this->hasMany(FormInputBrand::class,'brand_id');
    }
}
