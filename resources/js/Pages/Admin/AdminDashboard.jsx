import React from "react"
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import ApexCharts from 'apexcharts'

export default function AdminDashboard(props) {
    const { users,auth,groupedTransactionsSuccess,groupedTransactionsFailed,totalSuccessfulTransactionsToday,totalRevenueToday,totalRevenueThisMonth,
        totalTransactionsLastWeek,topProductsDetails } = props;

    const getInitials = (name) => {
        const nameParts = name.split(' ');

        const initials = nameParts.slice(0, 2).map(part => part[0]).join('');

        return initials.toUpperCase();
    };
    let dataBerhasil = [];
    let dataGagal = [];
    const totalTransactions = Object.values(topProductsDetails).reduce((acc, val) => acc + val, 0);

// Menghitung persentase untuk setiap produk
    const dataWithPercentage = {};
    for (const [product, count] of Object.entries(topProductsDetails)) {
        // Hitung nilai persentase dan bulatkan ke angka desimal terdekat
        const percentage = ((count / totalTransactions) * 100).toFixed(2);
        // Simpan nilai persentase dalam objek dataWithPercentage
        dataWithPercentage[product] = parseFloat(percentage); // Konversi ke angka float
    }


// Loop melalui semua nilai objek dalam data
    for (const key in groupedTransactionsSuccess) {
        if (Object.hasOwnProperty.call(groupedTransactionsSuccess, key)) {
            const element = groupedTransactionsSuccess[key];
            // Hitung panjang data dan tambahkan ke dataBerhasil
            dataBerhasil.push(element.length);
        }
    }
    for (const key in groupedTransactionsFailed) {
        if (Object.hasOwnProperty.call(groupedTransactionsFailed, key)) {
            const element = groupedTransactionsFailed[key];
            // Hitung panjang data dan tambahkan ke dataBerhasil
            dataGagal.push(element.length);
        }
    }


    const options = {
// add data series via arrays, learn more here: https://apexcharts.com/docs/series/
        series: [
            {
                name: "Transaksi Berhasil",
                data: dataBerhasil,
                color: "#0cf41f",
            },
            {
                name: "Transaksi Gagal",
                data: dataGagal,
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
            categories: Object.keys(groupedTransactionsSuccess),
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
    }

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
                        return value  + "%"
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                                {totalTransactionsLastWeek.length}
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
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Users
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                                        Add users, edit and more.
                                    </p>
                                </div>

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                           href="#">
                                            View all
                                        </a>

                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                           href="#">
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M5 12h14"/>
                                                <path d="M12 5v14"/>
                                            </svg>
                                            Add user
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th scope="col" className="ps-6 py-3 text-start">
                                        <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                            <input type="checkbox"
                                                   className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                   id="hs-at-with-checkboxes-main"/>
                                            <span className="sr-only">Checkbox</span>
                                        </label>
                                    </th>

                                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Name
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Role
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Status
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Total Transaksi
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Created
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-end"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 py-3">
                                                <label htmlFor="hs-at-with-checkboxes-3" className="flex">
                                                    <input type="checkbox"
                                                           className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                           id="hs-at-with-checkboxes-3"/>
                                                    <span className="sr-only">Checkbox</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                <span
                                                    className="inline-flex items-center justify-center size-[38px] rounded-full bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700">
                                                  <span
                                                      className="font-medium text-sm text-gray-800 leading-none dark:text-neutral-200">{getInitials(user.name)}</span>
                                                </span>
                                                    <div className="grow">
                                                    <span
                                                        className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{user.name}</span>
                                                        <span
                                                            className="block text-sm text-gray-500 dark:text-neutral-500">{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{user.role.toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                          <span
                                              className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                            <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16"
                                                 height="16"
                                                 fill="currentColor" viewBox="0 0 16 16">
                                              <path
                                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                            Active
                                          </span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                    <span
                                                        className="text-xs text-gray-500 dark:text-neutral-500">{user.transaction.length}</span>
                                                    {/*<div*/}
                                                    {/*    className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">*/}
                                                    {/*    <div*/}
                                                    {/*        className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-neutral-200"*/}
                                                    {/*        role="progressbar" style={{width: '100%'}}*/}
                                                    {/*        aria-valuenow="100"*/}
                                                    {/*        aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="text-sm text-gray-500 dark:text-neutral-500">{user.created_at}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
