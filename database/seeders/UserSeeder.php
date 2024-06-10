<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->truncate();
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'role' => 'admin',
            'password' => Hash::make('12341234'),
        ]);
        User::create([
            'name' => 'user',
            'email' => 'user@user.com',
            'role' => 'user',
            'password' => Hash::make('12341234'),
        ]);
//        $admin->assignRole('admin');
    }
}
