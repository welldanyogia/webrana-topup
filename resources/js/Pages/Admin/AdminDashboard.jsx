import React, {useEffect, useState} from "react"
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import ApexCharts from 'apexcharts'
import {format} from "date-fns";
import RecentTransactions from "@/Components/RecentTransactions.jsx";
import LoadingAnimation from "@/Components/LoadingAnimation.jsx";

export default function AdminDashboard(props) {
    const {
        users,
        auth,
        groupedTransactionsSuccess,
        groupedTransactionsFailed,
        totalSuccessfulTransactionsToday,
        totalRevenueToday,
        totalRevenueThisMonth,
        topProductsDetails,
        dates
    } = props;
    const [loading, setLoading] = useState(true);


    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }
    const getInitials = (name) => {
        const nameParts = name.split(' ');

        const initials = nameParts.slice(0, 2).map(part => part[0]).join('');

        return initials.toUpperCase();
    };
    const totalTransactions = Object.values(topProductsDetails).reduce((acc, val) => acc + val, 0);

    const formattedDates = dates.map(timestamp => {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        return date.toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'});
    });

    function sumTransactions(transactions) {
        return Object.values(transactions).reduce((total, num) => total + num, 0);
    }

    const totalFailedTransactions = sumTransactions(groupedTransactionsFailed);
    const totalSuccessTransactions = sumTransactions(groupedTransactionsSuccess);

// Menghitung persentase untuk setiap produk
    const dataWithPercentage = {};
    for (const [product, count] of Object.entries(topProductsDetails)) {
        // Hitung nilai persentase dan bulatkan ke angka desimal terdekat
        const percentage = ((count / totalTransactions) * 100).toFixed(2);
        // Simpan nilai persentase dalam objek dataWithPercentage
        dataWithPercentage[product] = parseFloat(percentage); // Konversi ke angka float
    }


    const options = {
        // add data series via arrays
        series: [
            {
                name: "Transaksi Berhasil",
                data: Object.values(groupedTransactionsSuccess),
                color: "#0cf41f",
            },
            {
                name: "Transaksi Gagal",
                data: Object.values(groupedTransactionsFailed),
                color: "#cf0404",
            },
        ],
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        legend: {
            show: true
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -26
            },
        },
        xaxis: {
            categories: formattedDates,
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value) {
                    return value + ' Transaksi';
                }
            }
        },
    };


    if (document.getElementById("legend-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("legend-chart"), options);
        chart.render();
    }


    const getChartOptions = (dataWithPercentage) => {
        // Mendapatkan nilai persentase dari objek data
        const percentages = Object.values(dataWithPercentage);

        return {
            series: percentages,
            colors: ["#1C64F2", "#16BDCA", "#9061F9"], // Ubah sesuai kebutuhan
            chart: {
                height: 420,
                width: "100%",
                type: "pie",
            },
            stroke: {
                colors: ["white"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: false,
                    },
                    size: "100%",
                    dataLabels: {
                        offset: -25
                    }
                },
            },
            labels: Object.keys(dataWithPercentage),
            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%"
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%"
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }

    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions(dataWithPercentage));
        chart.render();
    }

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }


    return (
        <AuthenticatedAdmin
            auth={props.auth}
            error={props.error}
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                Admin Dashboard
            </h2>
            }
        >

            <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/*<!-- Card */}
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                Total users
                            </p>
                            <div className="hs-tooltip">
                                <div className="hs-tooltip-toggle">
                                    <svg className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                        <path d="M12 17h.01"/>
                                    </svg>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      The number of users
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {users.length}
                            </h3>
                        </div>
                    </div>
                </div>
                {/*<!-- End Card */}
                {/*<!-- Card */}
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                Total transaksi berhasil hari ini
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {totalSuccessfulTransactionsToday}
                            </h3>
                        </div>
                    </div>
                </div>
                {/*<!-- End Card */}

                {/*<!-- Card */}
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                Total omset hari ini.
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {formatRupiah(totalRevenueToday)}
                            </h3>
                        </div>
                    </div>
                </div>
                {/*<!-- End Card */}

                {/*<!-- Card --*/}
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                Total omset bulan ini.
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {formatRupiah(totalRevenueThisMonth)}
                            </h3>
                        </div>
                    </div>
                </div>
                {/*<!-- End Card */}
            </div>
            {/*<!-- End Grid */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                {/*<!-- Card */}
                <div
                    className="p-4 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    {/*<!-- Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                                Total Transaksi dalam minggu ini
                            </h2>
                            <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {totalSuccessTransactions + totalFailedTransactions}
                            </p>
                        </div>

                        {/*<div>*/}
                        {/*    <span*/}
                        {/*        className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">*/}
                        {/*      <svg className="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
                        {/*           viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"*/}
                        {/*           strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>*/}
                        {/*      25%*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                    </div>
                    {/*<!-- End Header */}

                    <div id="legend-chart"></div>
                </div>
                {/*<!-- End Card */}

                {/*<!-- Card */}
                <div
                    className="p-4 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    {/*<!-- Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                                Brand dengan penjualan terbanyak
                            </h2>
                        </div>

                        <div>
                            {/*<span*/}
                            {/*    className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500">*/}
                            {/*  <svg className="inline-block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"*/}
                            {/*       height="24"*/}
                            {/*       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"*/}
                            {/*       strokeLinecap="round"*/}
                            {/*       strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>*/}
                            {/*  2%*/}
                            {/*</span>*/}
                        </div>
                    </div>
                    {/*<!-- End Header */}

                    <div className="py-6" id="pie-chart"></div>
                </div>
                {/*<!-- End Card */}

            </div>
            {/*<!-- Card */}
            <div className="flex flex-col">
                <div
                    className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                            Transactions
                        </h2>
                    </div>

                    <div>
                        <div className="inline-flex gap-x-2">
                            <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                               href="/admin/transaction">
                                View all
                            </a>
                        </div>
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}

                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-graywhitek:bg-neutral-800">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">No
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Tanggal
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Transaksi
                                        ID
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">User
                                        ID
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Nomor
                                        Handphone
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase dark:text-white">
                                        Produk
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase dark:text-white">
                                        Brand
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Harga
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Metode
                                        Pembayaran
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Status
                                        Transakasi
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase dark:text-white">Status
                                        Pembayaran
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <RecentTransactions/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- End Header */}
        </AuthenticatedAdmin>
    )
}
