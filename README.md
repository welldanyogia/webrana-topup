# Webrana Topup

Webrana Topup adalah source code aplikasi e-commerce untuk kebutuhan penjualan topup game serta produk digital lain. Project ini dibangun menggunakan [Laravel](https://laravel.com/) serta Inertia + React. Dokumentasi singkat berikut ditujukan bagi Anda yang ingin membeli source code ini.

## Fitur Admin

- **Dashboard statistik** menampilkan total transaksi harian/bulanan, grafik mingguan, dan produk terlaris.
- **Manajemen kategori**: tambah, ubah, dan hapus kategori produk.
- **Manajemen brand**: kelola brand beserta opsi formulir, pengaturan profit massal, dan gambar.
- **Manajemen produk**: tambah, ubah, hapus produk dan akun stok.
- **Manajemen transaksi**: lihat daftar transaksi, ubah status, dan pantau riwayat terbaru.
- **Integrasi payment gateway**: pengaturan Tripay dan Xendit serta pemilihan channel pembayaran aktif.
- **Integrasi bank transfer** melalui Moota untuk sinkronisasi mutasi rekening.
- **Integrasi Digiflazz** untuk mengambil price list otomatis dan memproses topup secara otomatis.
- **Gateway Whatsapp (Fonnte)** untuk mengirim notifikasi pembayaran maupun status transaksi.
- **Pengaturan tampilan**: unggah banner, logo, favicon, dan berbagai setting situs lainnya.
- **Manajemen pengguna**: melihat daftar user yang terdaftar.

## Fitur Pengguna

- **Registrasi dan login** dengan Laravel Breeze.
- **Beranda** menampilkan banner promosi serta daftar brand dan kategori.
- **Halaman detail produk** dengan pilihan nominal, formulir data akun game, dan metode pembayaran.
- **Cek username** untuk game tertentu sebelum melakukan transaksi.
- **Pembayaran** menggunakan virtual account/QRIS melalui Tripay atau transfer manual.
- **Riwayat transaksi** lengkap dengan pencarian ID transaksi.
- **Notifikasi WhatsApp** otomatis berisi detail pembayaran dan status pesanan.

## Cara Menjalankan

1. Clone repository ini dan jalankan `composer install` serta `npm install`.
2. Salin file `.env.example` menjadi `.env` kemudian atur koneksi database dan kredensial layanan pihak ketiga (Tripay, Digiflazz, Fonnte, dsb).
3. Jalankan `php artisan key:generate` kemudian `php artisan migrate` untuk membuat tabel database.
4. Build asset frontend dengan `npm run build` atau jalankan `npm run dev` saat pengembangan.
5. Terakhir jalankan server lokal dengan `php artisan serve`.

Source code siap untuk dikembangkan atau dipasang pada hosting Anda.

