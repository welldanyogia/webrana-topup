import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {format} from "date-fns";
import AddCategoryModal from "@/Components/AddCategoryModal.jsx";
import React, {useState} from "react";
import {router} from "@inertiajs/react";

export default function Transaction({transactions, transactionsPaginate}) {
    const [keyword, setKeyword] = useState('');

    // (transactionsPaginate)

    const filteredTransactions = transactions && keyword.length > 0 ? transactions.filter(transaction => {
        // Memastikan setiap nilai yang akan diakses tidak null
        return (
            transaction.trx_id &&
            transaction.user_id &&
            transaction.phone_number &&
            transaction.product_name &&
            transaction.product_brand &&
            transaction.payment_name
        ) && (
            // Cek jika ada kata kunci pencarian dan transaksi tidak null
            transaction.trx_id.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.user_id.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.phone_number.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.product_name.toLowerCase().includes(keyword.toLowerCase()) ||
            transaction.product_brand.toLowerCase().includes(keyword.toLowerCase()) ||
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

    const TransactionStatusDropdown = ({ currentStatus, onChangeStatus }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        const handleStatusChange = (newStatus) => {
            setIsOpen(false); // Close dropdown after selecting a status
            onChangeStatus(newStatus);
        };

        return (
            <div className="hs-dropdown inline-flex">
                <button
                    id="hs-dropdown-default"
                    type="button"
                    className='hs-dropdown-toggle'
                    onClick={toggleDropdown}
                >
                    {currentStatus}
                </button>
                {isOpen && (
                    <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full">
                        <button
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                            onClick={() => handleStatusChange("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                            onClick={() => handleStatusChange("process")}
                        >
                            Process
                        </button>
                        <button
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                            onClick={() => handleStatusChange("success")}
                        >
                            Success
                        </button>
                        <button
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                            onClick={() => handleStatusChange("failed")}
                        >
                            Failed
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderTransactionStatus = (status) => {
        let statusClass = "";
        switch (status) {
            case "pending":
                statusClass = "bg-orange-500 text-white";
                break;
            case "process":
                statusClass = "bg-blue-500 text-white";
                break;
            case "success":
                statusClass = "bg-green-500 text-white";
                break;
            case "failed":
                statusClass = "bg-red-500 text-white";
                break;
            default:
                statusClass = "bg-gray-500 text-white";
        }

        return (
            <span className={`${statusClass} text-xs font-medium px-2 py-0.5 rounded capitalize dark:text-primary-300`}>
            {status}
        </span>
        );
    };
    const renderTransactionPaymentStatus = (status) => {
        let statusClass = "";
        let text = "";
        switch (status) {
            case "UNPAID":
                statusClass = "bg-orange-500 text-white";
                text = "Menunggu Pembayaran";
                break;
            // case "process":
            //     statusClass = "bg-blue-500 text-white";
            //     break;
            case "PAID":
                statusClass = "bg-green-500 text-white";
                text = "Pembayaran Berhasil";
                break;
            case "EXPIRED":
                statusClass = "bg-red-500 text-white";
                text = "Pembayaran Kadaluarsa"
                break;
            default:
                statusClass = "bg-gray-500 text-white";
        }

        return (
            <span className={`${statusClass} text-xs font-medium px-2 py-0.5 rounded capitalize dark:text-primary-300`}>
            {text}
        </span>
        );
    };

    function handleStatusChange(e,trx_id, status) {
        e.preventDefault()
        router.post(`/admin/transaction/${trx_id}/update-status`,{
            status:status
        })
    }

    const renderTransactionRow = (transaction, index) => {
        const allStatuses = ["pending", "process", "success", "failed"];
        const allStatusClasses = {
            pending: "bg-orange-500 text-white hover:bg-orange-300",
            process: "bg-blue-500 text-white hover:bg-blue-300",
            success: "bg-green-500 text-white hover:bg-green-300",
            failed: "bg-red-500 text-white hover:bg-red-300"
        };
        const availableStatuses = allStatuses.filter(status => status !== transaction.status);

        return(
        <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800" key={index}>
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
                {transaction.user_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {transaction.phone_number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                {transaction.product_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                {transaction.product_brand}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                {formatRupiah(transaction.amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {transaction.payment_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <div className="hs-dropdown inline-flex">
                    <button id="hs-dropdown-default" type="button" className='hs-dropdown-toggle'>
                        {renderTransactionStatus(transaction.status)}
                    </button>
                    <div
                        className="hs-dropdown-menu space-y-2 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                        aria-labelledby="hs-dropdown-default">
                        {availableStatuses.map((status) => (
                            <button
                                key={status}
                                className={`${allStatusClasses[status]} flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm  focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-700`}
                                onClick={(e) => handleStatusChange(e,transaction.trx_id, status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                {renderTransactionPaymentStatus(transaction.payment_status)}
            </td>
        </tr>
        )
    };

    const TransactionTable = () => {
        const hasFilteredTransactions = keyword.length > 0 && filteredTransactions.length > 0;

        return (
            <>
                {hasFilteredTransactions ? (
                    filteredTransactions.map((transaction, index) => (
                        renderTransactionRow(transaction, index)
                    ))
                ) : (
                    transactionsPaginate.data.map((transaction, index) => (
                        renderTransactionRow(transaction, index)
                    ))
                )}
            </>
        );
    };
    return (
        <AuthenticatedAdmin>
            <div className='w-full'>
                <div className="flex flex-col">
                    <div className="font-bold text-xl dark:text-white text-neutral-900">
                        Transaksi
                    </div>
                    <div
                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                        <div>
                            <div className="inline-flex gap-x-2">

                                <div className="sm:block">
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
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
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
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">User
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
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Harga
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Metode
                                            Pembayaran
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status Transakasi
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status
                                            Pembayaran
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        // keyword && filteredTransactions && transactionsPaginate &&
                                        TransactionTable(keyword, filteredTransactions, transactionsPaginate)
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
