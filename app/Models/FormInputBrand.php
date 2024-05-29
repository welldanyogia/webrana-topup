<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormInputBrand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'brand_id'
    ];

    public function options()
    {
        return $this->hasMany(OptionSelectInput::class, 'form_input_id', 'id');
    }

    public function brands()
    {
        return $this->belongsTo(Brand::class,'brand_id');
    }
}
