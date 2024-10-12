import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import {format} from 'date-fns';
import SigninModal from "@/Components/SigninModal.jsx";
import React from "react";
import SignupModal from "@/Components/SignupModal.jsx";

export default function TransactionHistory({auth, latestTransaction, searchResult, searchMessage}) {
    const isAuthenticated = auth?.user && auth.user.role === 'user';
    const Layout = isAuthenticated ? Authenticated : GuestLayout;

    const {data, setData, post, errors} = useForm({
        trx_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('transactions.search'));
    };
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp');
    };

    const maskValue = (string) => {
        if (string.length <= 4) return string; // If the ID is too short to mask
        return string.substring(0, 2) + '****' + string.substring(string.length - 2);
    };

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    return (
        <Layout
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Transaction Detail</h2>}
        >
            <SigninModal />
            <SignupModal />
            <Head title="Riwayat Pesanan"/>
            <div className="w-3/4 mx-auto space-y-6">
                <div className="font-bold text-xl dark:text-white text-neutral-900">
                    Cek Riwayat Transaksi Anda
                </div>
                <div className="w-3/4">
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                                    <svg className="flex-shrink-0 size-4 text-primary-400 dark:text-white/60"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </svg>
                                </div>
                                <input
                                    className="py-3 ps-10 pe-4 block w-full border-primary-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary-dark-900 dark:border-primary-dark-700 dark:text-white dark:placeholder-white dark:focus:ring-primary-dark-600"
                                    type="text"
                                    placeholder="Masukkan Transaksi ID"
                                    value={data.trx_id}
                                    onChange={e => setData('trx_id', e.target.value)}
                                />
                            </div>
                            {errors.trx_id && <div className="text-red-500 mt-2">{errors.trx_id}</div>}
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded-lg">
                            Search
                        </button>
                    </form>
                </div>
                {searchMessage && (
                    <div className="mt-6 text-red-500">
                        {searchMessage}
                    </div>
                )}
                {searchResult && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Search Result:</h3>
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-primary-200 dark:divide-primari-dark-700">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Tanggal
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Transaksi
                                                ID
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Transaksi
                                                Produk
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Nomor
                                                Handphone
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-primary-500 uppercase dark:text-white">Harga
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-primary-500 uppercase dark:text-white">Status
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-primary-500 uppercase dark:text-white">Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {/*{*/}
                                        {/*    // latestTransaction && latestTransaction.map((transaction, index) => (*/}
                                        <tr className="odd:bg-white even:bg-primary-100 dark:odd:bg-primary-dark-900 dark:even:bg-primary-dark-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-800 dark:text-neutral-200">
                                                {formatDate(searchResult.created_at)}

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                <Link className='hover:underline'
                                                      href={route('detail.transaction', searchResult.trx_id)}>
                                                    {searchResult.trx_id}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                {transaction.product_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                {searchResult.phone_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                {formatRupiah(searchResult.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                {
                                                    searchResult.status === 'pending' && (
                                                        <span
                                                            className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-orange-500 dark:text-white dark:text-primary-300">
                                                                {searchResult.status}
                                                                </span>
                                                    )
                                                }
                                                {
                                                    searchResult.status === 'process' && (
                                                        <span
                                                            className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-blue-500 dark:text-white dark:text-primary-300">
                                                                {searchResult.status}
                                                                </span>
                                                    )
                                                }
                                                {
                                                    searchResult.status === 'success' && (
                                                        <span
                                                            className="bg-green-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-green-500 dark:text-white dark:text-primary-300">
                                                                {searchResult.status}
                                                                </span>
                                                    )
                                                }
                                                {
                                                    searchResult.status === 'failed' && (
                                                        <span
                                                            className="bg-red-500 text-white text-xs font-medium px-2 py-0.5
                                                                    rounded capitalize dark:bg-red-500 dark:text-white dark:text-primary-300">
                                                            {searchResult.status}
                                                                </span>
                                                    )
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-bold">
                                                <Link className='hover:underline'
                                                      href={route('detail.transaction', searchResult.trx_id)}>
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                        {/*// ))*/}
                                        {/*}*/}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='w-full'>
                    <div className="flex flex-col">
                        <div className="font-bold text-xl dark:text-white text-neutral-900">
                            Riwayat Transakasi Real-Time
                        </div>
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-primary-200 dark:divide-primary-dark-700">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Tanggal
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Transaksi
                                                ID
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">
                                                Produk
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-primary-500 uppercase dark:text-white">Nomor
                                                Handphone
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-primary-500 uppercase dark:text-white">Harga
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-primary-500 uppercase dark:text-white">Status
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            latestTransaction && latestTransaction.map((transaction, index) => (
                                                <tr className="odd:bg-white even:bg-primary-100 dark:odd:bg-primary-dark-900 dark:even:bg-primary-dark-800"
                                                    key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-800 dark:text-neutral-200">
                                                        {formatDate(transaction.created_at)}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                        {maskValue(transaction.trx_id)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                        {transaction.product_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800 dark:text-neutral-200">
                                                        {maskValue(transaction.phone_number)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        {formatRupiah(transaction.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        {
                                                            transaction.status === 'pending' && (
                                                                <span
                                                                    className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-orange-500 dark:text-white dark:text-primary-300">
                                                                {transaction.status}
                                                                </span>
                                                            )
                                                        }
                                                        {
                                                            transaction.status === 'process' && (
                                                                <span
                                                                    className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-blue-500 dark:text-white dark:text-primary-300">
                                                                {transaction.status}
                                                                </span>
                                                            )
                                                        }
                                                        {
                                                            transaction.status === 'success' && (
                                                                <span
                                                                    className="bg-green-500 text-white text-xs font-medium px-2 py-0.5
                                                                        rounded capitalize dark:bg-green-500 dark:text-white dark:text-primary-300">
                                                                {transaction.status}
                                                                </span>
                                                            )
                                                        }
                                                        {
                                                            transaction.status === 'failed' && (
                                                                <span
                                                                    className="bg-red-500 text-white text-xs font-medium px-2 py-0.5
                                                                    rounded capitalize dark:bg-red-500 dark:text-white dark:text-primary-300">
                                                            {transaction.status}
                                                                </span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
