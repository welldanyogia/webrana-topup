<?php

namespace App\Http\Controllers;

use App\Models\FormInputBrand;
use App\Models\OptionSelectInput;
use Illuminate\Http\Request;

class FormInputController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:number,text,select',
        ]);

        // Buat FormInputBrand baru
        $formInputBrand = FormInputBrand::create([
            'name' => $request->get('name'),
            'type' => $request->get('type'),
            'brand_id' => $request->get('brand_id'),
        ]);


        return redirect()->back()->with(['flash'=>['message' => 'Form Input successfully added']]);
    }
}
