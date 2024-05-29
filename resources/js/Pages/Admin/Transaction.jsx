import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {format} from "date-fns";
import AddCategoryModal from "@/Components/AddCategoryModal.jsx";
import React, {useState} from "react";

export default function Transaction({transactions,transactionsPaginate}){
    const [keyword, setKeyword] = useState('');

    console.log(transactionsPaginate)

    const filteredTransactions = transactionsPaginate ? transactionsPaginate.data.filter(transaction => {
        // Memastikan setiap nilai yang akan diakses tidak null
        return (
            transaction.trx_id &&
            transaction.phone_number &&
            transaction.payment_name
        ) && (
            // Cek jika ada kata kunci pencarian dan transaksi tidak null
            transaction.trx_id.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.phone_number.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.payment_name.toLowerCase().includes(keyword.toLowerCase())
        );
    }) : [];
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp');
    };
    return (
        <AuthenticatedAdmin>
            Transaksi
            <div className='w-full'>
                <div className="flex flex-col">
                    <div className="font-bold text-xl dark:text-white text-neutral-900">
                        Riwayat Transakasi Real-Time
                    </div>
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <div
                                    className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                            Categories
                                        </h2>
                                        <p className="text-sm text-white text-gray-600 dark:text-neutral-400">
                                            Add categories, edit and more.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="inline-flex gap-x-2">

                                            <div className="hidden sm:block">
                                                <label htmlFor="icon" className="sr-only">Search</label>
                                                <div className="relative min-w-72 md:min-w-80">
                                                    <div
                                                        className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                                        <svg
                                                            className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-400"
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none" stroke="currentColor" strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <circle cx="11" cy="11" r="8"/>
                                                            <path d="m21 21-4.3-4.3"/>
                                                        </svg>
                                                    </div>
                                                    <input type="text" id="icon" name="icon"
                                                           className="py-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                           placeholder="Search"
                                                           onChange={(e) => setKeyword(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">No
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Tanggal
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Transaksi
                                            ID
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Nomor
                                            Handphone
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Produk
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Brand
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Harga
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Metode
                                            Pembayaran
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredTransactions.map((transaction, index) => (
                                            <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                                                key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                    {index + 1}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                    {formatDate(transaction.created_at)}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.trx_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.phone_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {transaction.product_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {transaction.product_brand}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {formatRupiah(transaction.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.payment_name}
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
                                    {
                                        transactionsPaginate && filteredTransactions === null && transactionsPaginate.data.map((transaction, index) => (
                                            <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                                                key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                    {index + 1}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                    {formatDate(transaction.created_at)}

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.trx_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.phone_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {transaction.product_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {transaction.product_brand}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    {formatRupiah(transaction.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {transaction.payment_name}
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
                                <div
                                    className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                        <span
                                                            className="font-semibold text-gray-800 dark:text-neutral-200">{transactionsPaginate.total}</span> results
                                        </p>

                                    </div>

                                    <div>
                                        <div className="inline-flex gap-x-2">
                                            {/*{products.links}*/}
                                            <a
                                                type="button"
                                                href={transactionsPaginate.prev_page_url ? transactionsPaginate.prev_page_url : "#"}
                                                className={`py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 ${!transactionsPaginate.prev_page_url && 'disabled:opacity-50 disabled:pointer-events-none'}`}
                                                disabled={transactionsPaginate.prev_page_url != null}
                                            >
                                                <svg className="flex-shrink-0 size-4"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2"
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <path d="m15 18-6-6 6-6"/>
                                                </svg>
                                                Prev
                                            </a>
                                            <div
                                                className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                            >
                                                {transactionsPaginate.current_page}
                                            </div>

                                            <a type="button"
                                               href={transactionsPaginate.next_page_url ? transactionsPaginate.next_page_url : "#"}
                                               className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                               disabled={transactionsPaginate.prev_page_url != null}
                                            >
                                                Next
                                                <svg className="flex-shrink-0 size-4"
                                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                                     height="24" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m9 18 6-6-6-6"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
