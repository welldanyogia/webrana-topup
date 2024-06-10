<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_gateways')->truncate();

        DB::table('payment_gateways')->insert([
            [
                'payment_gateway_id' => Str::uuid(),
                'payment_gateway_name' => 'Tripay',
                'payment_gateway_status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
//            [
//                'payment_gateway_id' => Str::uuid(),
//                'payment_gateway_name' => 'Xendit',
//                'payment_gateway_status' => false,
//                'created_at' => now(),
//                'updated_at' => now(),
//            ]
        ]);
    }
}
