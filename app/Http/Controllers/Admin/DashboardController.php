<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transactions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
//        $users = User::where('role', 'user')->get;
//        $users = User::all();
        // Periksa apakah pengguna sudah login
        if (!Auth::check()) {
            // Jika belum, arahkan ke halaman login
            return redirect()->route('login');
        }
        if (Auth::user()->role !== 'admin') {
            // Jika bukan admin, tampilkan pesan kesalahan atau arahkan ke halaman lain
//            return abort(403, 'Unauthorized access');
            return redirect()->route('/');
        }
        $today = Carbon::now();
        $startDateChart = $today->copy()->subDays(6);
        $endDateChart = $today;
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $startWeekDate = Carbon::now()->startOfWeek()->subWeek();
        $endWeekDate = Carbon::now()->endOfWeek()->subWeek();
        $user = User::where('role', 'user')->with('transaction')->get();
        $transactions = Transactions::whereBetween('created_at', [$startDate, $endDate])
            ->get();
        $totalSuccessfulTransactionsToday = Transactions::where('status', 'success')
            ->whereDate('created_at', $today)
            ->count();
        $totalRevenueToday = Transactions::whereDate('created_at', $today)
            ->where('status', 'success') // Optionally, filter by successful transactions
            ->sum('amount');
        $totalRevenueThisMonth = Transactions::whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'success') // Optionally, filter by successful transactions
            ->sum('amount');
        $totalTransactionsLastWeek = Transactions::whereBetween('created_at', [$startWeekDate, $today])
            ->where(function ($query) {
                $query->where('status', 'failed')
                    ->orWhere('status', 'success');
            })
            ->get();

        $groupedTransactionsSuccess = $totalTransactionsLastWeek->where('status','success')->groupBy(function($transaction) {
            // Ambil tanggal dari setiap transaksi dan format ulang sebagai string 'Y-m-d'
            return Carbon::parse($transaction->created_at)->format('Y-m-d');
        });
        $groupedTransactionsFailed = $totalTransactionsLastWeek->where('status','failed')->groupBy(function($transaction) {
            // Ambil tanggal dari setiap transaksi dan format ulang sebagai string 'Y-m-d'
            return Carbon::parse($transaction->created_at)->format('Y-m-d');
        });

        $topProducts = $transactions->groupBy('product_brand')
            ->map(function ($transactions) {
                return $transactions->count();
            });

        // Mengurutkan produk berdasarkan jumlah transaksi (dari yang terbanyak)
        $topProducts = $topProducts->sortDesc();

        // Mengambil lima produk teratas
        $topProducts = $topProducts->take(5);

        // Mendapatkan detail produk dari database
        $topProductsDetails = [];
        foreach ($topProducts as $productId => $transactionCount) {
            $product = DB::table('products')->find($productId);
            if ($product) {
                $product->transaction_count = $transactionCount;
                $topProductsDetails[] = $product;
            }
        }


        return Inertia::render('Admin/AdminDashboard', [
            'users' => $user,
            'totalSuccessfulTransactionsToday' => $totalSuccessfulTransactionsToday,
            'totalRevenueToday' => $totalRevenueToday,
            'totalRevenueThisMonth' => $totalRevenueThisMonth,
            'totalTransactionsLastWeek' => $totalTransactionsLastWeek,
            'endDate' => $endDateChart,
            'groupedTransactionsSuccess'=>$groupedTransactionsSuccess,
            'groupedTransactionsFailed'=>$groupedTransactionsFailed,
            'topProductsDetails' => $topProducts,
        ]);
    }
}
