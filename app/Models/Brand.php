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

    protected $fillable = [
        'brand_id','brand_name','code','qty_status','qty_minimum', 'category_id','brand_status','brand_desc','image_url',
        'processed_by', 'mass_profit', 'mass_profit_status','brand_desc','brand_type'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
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
