import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {format} from "date-fns";
import {CSSProperties} from "react";
import {ClipLoader, SyncLoader} from "react-spinners"; // Importing a spinner from react-loader-spinner

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp');
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
            <span className={`${statusClass} text-xs font-medium px-2 py-0.5 rounded capitalize text-white`}>
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
            <span className={`${statusClass} text-xs font-medium px-2 py-0.5 rounded capitalize text-white`}>
            {text}
        </span>
        );
    };

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }


    const fetchRecentTransactions = async () => {
        try {
            const response = await axios.get('/api/recent-transactions');
            setTransactions(response.data.data);
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchRecentTransactions();
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            {transactions.map((transaction, index) => (
                <tr key={transaction.trx_id}>
                    <td className="size-px whitespace-nowrap">
                        <div className="ps-6 py-3">
                            {index + 1}
                        </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {formatDate(transaction.created_at)}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.trx_id}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.user_id}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.phone_number}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.product_name}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.product_brand}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {formatRupiah(transaction.amount)}
                                    </span>
                        </div>
                    </td>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        {transaction.payment_name}
                                    </span>
                        </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                            {renderTransactionStatus(transaction.status)}
                        </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                            {renderTransactionPaymentStatus(transaction.payment_status)}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default RecentTransactions;
