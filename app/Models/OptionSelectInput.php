<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionSelectInput extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'name',
        'form_input_id'
    ];

    public function formInputBrand()
    {
        return $this->belongsTo(FormInputBrand::class,'form_input_id','id');
    }
}
