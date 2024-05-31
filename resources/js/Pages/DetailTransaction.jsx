import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Head} from "@inertiajs/react";
import React, { useEffect, useState, useCallback } from "react";
import {transform} from "lodash";
import TransactionUnpaid from "@/Components/TransactionUnpaid.jsx";
import TransactionPaid from "@/Components/TransactionPaid.jsx";
import {useLocation} from "react-router-dom";
import DOMPurify from 'dompurify';
import PaymentInstruction from "@/Components/PaymentInstruction.jsx";
import SigninModal from "@/Components/SigninModal.jsx";

export default function DetailTransaction({auth, transaction,paymentInstruction,data}) {
    const isAuthenticated = auth?.user && auth.user.role === 'user';
    const Layout = isAuthenticated ? Authenticated : GuestLayout;
    const [countDownTime, setCountDownTime] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }
    const replacePlaceholders = (text, payCode) => {
        return text.replace(/{{pay_code}}/g, payCode);
    };
    const getTimeDifference = (targetTime) => {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
            setCountDownTime({
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            });
            return;
        }

        const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

        setCountDownTime({
            days: days >= 10 ? days.toString() : `0${days}`,
            hours: hours >= 10 ? hours.toString() : `0${hours}`,
            minutes: minutes >= 10 ? minutes.toString() : `0${minutes}`,
            seconds: seconds >= 10 ? seconds.toString() : `0${seconds}`,
        });
    };

    useEffect(() => {
        const targetTime = new Date(transaction.expired_time.replace(" ", "T")).getTime();

        if (new Date().getTime() < targetTime) {
            const interval = setInterval(() => {
                getTimeDifference(targetTime);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on unmount
        } else {
            getTimeDifference(targetTime); // Set countdown to 00:00:00:00 if time has already expired
        }
    }, [transaction.expired_time]);
    return (
        <Layout
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Transaction Detail</h2>}
        >
            <Head title={transaction.trx_id}/>
            <SigninModal />
            <div className="grid text-neutral-800 dark:text-white gap-6 w-3/4 mb-10 mx-auto md:grid max-sm:flex max-sm:flex-col">
                <div className="grid grid-cols-2 dark:border-white md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 border-b-2 w-full space-y-2 p-4">
                    {
                        transaction.payment_status === 'UNPAID' && (
                            <TransactionUnpaid transaction={transaction} countDownTime={countDownTime}/>
                        )
                    }
                    {
                        transaction.payment_status === 'PAID' && (
                            <TransactionPaid transaction={transaction}/>
                        )
                    }
                    {
                        transaction.qr_url && transaction.payment_status === 'UNPAID' && (
                            <div className="dark:border-white border-2 rounded-xl mx-auto p-4">
                                <img src={transaction.qr_url} alt="" srcSet=""/>
                            </div>
                        )
                    }
                </div>
                <div
                    className="grid grid-cols-3 grid-flow-row md:grid-cols-3 sm:grid-cols-1 max-sm:grid-cols-1 p-4 sm-:p-0 max-sm:p-0 gap-6">
                    <div className="col-span-2 border-2 dark:border-white h-auto rounded-xl">
                        <h1 className="flex justify-between dark:text-white font-bold border-b-2 p-4">
                            <div>
                                Detail Pesanan
                            </div>
                            <div className="flex gap-6 dark:text-white font-bold">
                                {transaction.trx_id}
                                <div className="flex font-bold max-sm:py-10">
                                    {
                                        transaction.status === 'pending' && (
                                            <span
                                                className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5
                                                rounded capitalize dark:bg-orange-500 dark:text-white dark:text-primary-300">
                                        {transaction.status}</span>
                                        )
                                    }
                                    {
                                        transaction.status === 'process' && (
                                            <span
                                                className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5
                                                rounded capitalize dark:bg-blue-500 dark:text-white dark:text-primary-300">
                                        {transaction.status}</span>
                                        )
                                    }
                                    {
                                        transaction.status === 'success' && (
                                            <span
                                                className="bg-green-500 text-white text-xs font-medium px-2 py-0.5
                                                rounded capitalize dark:bg-green-500 dark:text-white dark:text-primary-300">
                                        {transaction.status}</span>
                                        )
                                    }
                                    {
                                        transaction.status === 'failed' && (
                                            <span
                                                className="bg-red-500 text-white text-xs font-medium px-2 py-0.5
                                                rounded capitalize dark:bg-red-500 dark:text-white dark:text-primary-300">
                                        {transaction.status}</span>
                                        )
                                    }
                                </div>
                            </div>

                        </h1>
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 dark:border-white border-2 divide-x-2">
                        <div className="grid p-2">
                                <div className="flex justify-between font-bold">
                                    <div className="flex">
                                        Item
                                    </div>
                                    <div className="flex">
                                        {transaction.product_name}
                                    </div>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <div className="flex">
                                        UserID
                                    </div>
                                    <div className="flex">
                                        {transaction.user_id}
                                    </div>
                                </div>
                                {
                                    transaction.user_name !==null && transaction.user_name !== "default_customer_name" && (
                                        <div className="flex justify-between font-bold">
                                            <div className="flex">
                                                Username
                                            </div>
                                            <div className="flex">
                                                {transaction.user_name}
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex justify-between font-bold">
                                    <div className="flex">
                                        Product
                                    </div>
                                    <div className="flex">
                                        {transaction.product_brand}
                                    </div>
                                </div>
                                {
                                    transaction.phone_number !== null && (
                                        <div className="flex justify-between font-bold">
                                            <div className="flex">
                                                Nomor Whatsapp
                                            </div>
                                            <div className="flex">
                                                {transaction.phone_number}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    transaction.email !== null && (
                                        <div className="flex justify-between font-bold">
                                            <div className="flex">
                                                Email
                                            </div>
                                            <div className="flex">
                                                {transaction.email}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="space-y-2 p-2 ">
                                <div className="border-b-2 pb-6 dark:border-white">
                                    <div className="flex justify-between py-2">
                                        <div className="flex">
                                            Status Transaksi
                                        </div>
                                            {
                                                transaction.payment_status === 'UNPAID' && (
                                                    <div className="flex font-bold">
                                                    <span
                                                        className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded capitalize dark:bg-orange-500 dark:text-white dark:text-primary-300">
                                                        {transaction.payment_status}</span>
                                                    </div>
                                                )
                                            }
                                        {
                                            transaction.payment_status === 'PAID' && (
                                                <div className="flex font-bold">
                                                    <span
                                                        className="bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded capitalize dark:bg-green-500 dark:text-white dark:text-primary-300">
                                                        {transaction.payment_status}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            transaction.payment_status === 'FAILED' &&
                                            transaction.payment_status === 'EXPIRED' &&
                                            transaction.payment_status === 'REFUND' &&(
                                                <div className="flex font-bold">
                                                    <span
                                                        className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded capitalize dark:bg-red-500 dark:text-white dark:text-primary-300">
                                                        {transaction.payment_status}</span>
                                                </div>
                                            )
                                        }
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex">
                                            Metode Pembayaran
                                        </div>
                                        <div className="flex font-bold">
                                            {transaction.payment_name}
                                        </div>
                                    </div>
                                    {
                                        transaction.no_va !== null && (
                                            <div className="flex justify-between">
                                                <div className="flex py-2">
                                                    No Va
                                                </div>
                                                <div className="flex font-bold">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div id="hs-clipboard-basic"
                                                             className="text-sm font-medium text-gray-800 dark:text-white">
                                                            {transaction.no_va}
                                                        </div>
                                                        <button type="button"
                                                                className="js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                                data-clipboard-target="#hs-clipboard-basic"
                                                                data-clipboard-action="copy"
                                                                data-clipboard-success-text="Copied">
                                                            <svg
                                                                className="js-clipboard-default size-4 group-hover:rotate-6 transition"
                                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                                                                <path
                                                                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                                            </svg>

                                                            <svg
                                                                className="js-clipboard-success hidden size-4 text-blue-600"
                                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="flex justify-between">
                                        <div className="flex">
                                            Harga
                                        </div>
                                        <div className="flex font-bold">
                                            {formatRupiah(transaction.product_price)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            Biaya Admin
                                        </div>
                                        <div className="flex font-bold">
                                            {formatRupiah(transaction.fee)}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-between text-neutral-800">
                                    <div className="text-white py-2 font-bold">Total</div>
                                    {/*{{--                            <div class="font-bold font-bold text-blue-600">Rp. 20.000</div>--}}*/}
                                    <div className="inline-flex items-center gap-x-3">
                                        <div id="hs-clipboard-basic-total"
                                             className="hidden text-sm font-medium text-gray-800 dark:text-white">
                                            {transaction.amount}
                                        </div>
                                        <div
                                             className="text-sm font-medium text-gray-800 dark:text-white">
                                            {formatRupiah(transaction.amount)}
                                        </div>
                                        <button type="button"
                                                className="js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                data-clipboard-target="#hs-clipboard-basic-total" data-clipboard-action="copy"
                                                data-clipboard-success-text="Copied">
                                            <svg className="js-clipboard-default size-4 group-hover:rotate-6 transition"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                                                <path
                                                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            </svg>

                                            <svg className="js-clipboard-success hidden size-4 text-blue-600"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 dark:border-white border-2 h-auto rounded-xl">
                    <div className="text-neutral-800 dark:text-white font-bold border-b-2 dark:border-white p-3">Cara Pembayaran {transaction.payment_name}</div>
                        <PaymentInstruction paymentInstruction={paymentInstruction} transaction={transaction}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
