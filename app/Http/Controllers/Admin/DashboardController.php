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
        // Periksa apakah pengguna sudah login
        if (!Auth::check()) {
            // Jika belum, arahkan ke halaman login
            return redirect()->route('login');
        }

        // Periksa apakah pengguna adalah admin
        if (Auth::user()->role !== 'admin') {
            // Jika bukan admin, arahkan ke halaman utama atau tampilkan pesan kesalahan
            return redirect()->route('/');
        }

        $today = Carbon::now();
        $startDateChart = $today->copy()->subDays(6);
        $endDateChart = $today;
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $startWeekDate = Carbon::now()->startOfWeek()->subWeek();
        $endWeekDate = Carbon::now()->endOfWeek()->subWeek();

        // Mendapatkan pengguna dengan peran 'user' dan transaksi mereka
        $user = User::where('role', 'user')->with('transaction')->get();

        // Mendapatkan transaksi dalam bulan ini
        $transactions = Transactions::whereBetween('created_at', [$startDate, $endDate])->get();

        // Menghitung total transaksi sukses hari ini
        $totalSuccessfulTransactionsToday = Transactions::where('status', 'success')
            ->whereDate('created_at', $today)
            ->count();

        // Menghitung total pendapatan hari ini dari transaksi sukses
        $totalRevenueToday = Transactions::whereDate('created_at', $today)
            ->where('status', 'success')
            ->sum('amount');

        // Menghitung total pendapatan bulan ini dari transaksi sukses
        $totalRevenueThisMonth = Transactions::whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'success')
            ->sum('amount');

        // Mendapatkan transaksi dalam minggu terakhir yang berstatus 'failed' atau 'success'
        $totalTransactionsLastWeek = Transactions::whereBetween('created_at', [$startWeekDate->copy(), $today])
            ->where(function ($query) {
                $query->where('status', 'failed')
                    ->orWhere('status', 'success');
            })
            ->get();

        // Membuat array tanggal dalam minggu terakhir
        $dates = [];
        $current = $today->copy()->subDays(6);
        while ($current->lte($today)) {
            $dates[] = $current->timestamp;
            $current->addDay();
        }

// Mengelompokkan transaksi sukses dan gagal berdasarkan tanggal
        $groupedTransactionsSuccess = [];
        $groupedTransactionsFailed = [];
        foreach ($dates as $timestamp) {
            $date = Carbon::createFromTimestamp($timestamp)->toDateString();
            $groupedTransactionsSuccess[$date] = $totalTransactionsLastWeek->where('created_at', '>=', $date)
                ->where('created_at', '<', Carbon::parse($date)->addDay())
                ->where('status', 'success')
                ->count();
            $groupedTransactionsFailed[$date] = $totalTransactionsLastWeek->where('created_at', '>=', $date)
                ->where('created_at', '<', Carbon::parse($date)->addDay())
                ->where('status', 'failed')
                ->count();
        }

        // Mengelompokkan transaksi berdasarkan brand produk dan menghitung jumlahnya
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

        // Merender view dengan data yang telah diolah
        return Inertia::render('Admin/AdminDashboard', [
            'users' => $user,
            'totalSuccessfulTransactionsToday' => $totalSuccessfulTransactionsToday,
            'totalRevenueToday' => $totalRevenueToday,
            'totalRevenueThisMonth' => $totalRevenueThisMonth,
            'totalTransactionsLastWeek' => $totalTransactionsLastWeek,
            'endDate' => $endDateChart,
            'groupedTransactionsSuccess' => $groupedTransactionsSuccess,
            'groupedTransactionsFailed' => $groupedTransactionsFailed,
            'topProductsDetails' => $topProducts,
            'dates' => $dates
        ]);
    }

    public function getRecentTransactions(): \Illuminate\Http\JsonResponse
    {
        try {
            $recentTransactions = Transactions::orderBy('created_at', 'desc')->take(10)->get();

            return response()->json([
                'success' => true,
                'data' => $recentTransactions,
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
