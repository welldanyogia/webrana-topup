import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Head} from "@inertiajs/react";
import React, {useEffect, useState, useCallback} from "react";
import {transform} from "lodash";
import TransactionUnpaid from "@/Components/TransactionUnpaid.jsx";
import TransactionPaid from "@/Components/TransactionPaid.jsx";
import {useLocation} from "react-router-dom";
import DOMPurify from 'dompurify';
import PaymentInstruction from "@/Components/PaymentInstruction.jsx";
import SigninModal from "@/Components/SigninModal.jsx";
import SignupModal from "@/Components/SignupModal.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function DetailTransaction({auth, transaction,bank_account ,paymentInstruction, data}) {
    const [loading, setLoading] = useState(false);
    const [matched, setMatched] = useState(false);
    const [error, setError] = useState(null);
    const isAuthenticated = auth?.user && auth.user.role === 'user';
    const Layout = isAuthenticated ? Authenticated : GuestLayout;
    const [countDownTime, setCountDownTime] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });


    const formatDate = (timestamp) => {
        const dateObject = new Date(timestamp);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const date = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
    };


    if (transaction.no_rekening !== null){
        paymentInstruction = {
            success: true,
            message: "",
            data: [
                {
                    "title": "Internet Banking BCA",
                    "steps": [
                        "Login ke internet banking KlikBCA Anda.",
                        "Pilih menu <b>Transfer Dana</b>.",
                        "Pilih <b>Transfer ke Rekening BCA</b>.",
                        "Masukkan Nomor Rekening Tujuan (<b>{{pay_code}}</b>) dan jumlah yang akan ditransfer.",
                        "Klik <b>Lanjutkan</b>.",
                        "Periksa detail transaksi, pastikan data sudah sesuai.",
                        "Masukkan respon KeyBCA Anda dari Appli 1.",
                        "Klik <b>Kirim</b>.",
                        "Transaksi sukses, simpan bukti transaksi Anda."
                    ]
                },
                {
                    "title": "Aplikasi BCA Mobile",
                    "steps": [
                        "Login ke aplikasi BCA Mobile Anda.",
                        "Pilih menu <b>m-Transfer</b>.",
                        "Pilih <b>Transfer Antar Rekening</b>.",
                        "Masukkan Nomor Rekening Tujuan (<b>{{pay_code}}</b>) dan jumlah yang akan ditransfer.",
                        "Klik <b>Kirim</b>.",
                        "Periksa detail transaksi, pastikan data sudah sesuai.",
                        "Masukkan PIN m-BCA Anda.",
                        "Klik <b>OK</b>.",
                        "Transaksi sukses, simpan bukti transaksi Anda."
                    ]
                },
                {
                    "title": "ATM BCA",
                    "steps": [
                        "Masukkan kartu ATM BCA Anda ke mesin ATM.",
                        "Pilih menu <b>Transaksi Lainnya</b>.",
                        "Pilih <b>Transfer</b>.",
                        "Pilih <b>Ke Rekening BCA</b>.",
                        "Masukkan Nomor Rekening Tujuan (<b>{{pay_code}}</b>) dan jumlah yang akan ditransfer.",
                        "Ikuti instruksi untuk menyelesaikan transaksi.",
                        "Transaksi sukses, simpan bukti transaksi Anda."
                    ]
                },
                {
                    "title": "Transfer dari Bank Lain",
                    "steps": [
                        "Login ke layanan internet/mobile banking Bank Anda.",
                        "Pilih menu <b>Transfer Dana</b> atau yang serupa.",
                        "Pilih opsi <b>Transfer ke Rekening Bank Lain</b>.",
                        "Masukkan Nomor Rekening Tujuan (<b>{{pay_code}}</b>) dan jumlah yang akan ditransfer.",
                        "Ikuti langkah-langkah berikutnya sesuai dengan petunjuk dari bank Anda.",
                        "Pastikan untuk menyimpan bukti transaksi Anda."
                    ]
                }

            ]
        }
    }

    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return date.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    // };
    const dataTrx = {
        transaction : transaction.trx_id,
        bank : transaction.no_rekening,
        start_date : formatDate(transaction.created_at),
        end_date : formatDate(transaction.expired_time),
    }
    // console.log(dataTrx)

    const checkMutation = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/mutations`, dataTrx
//                 {
//                 // transaction: transaction.trx_id,
//                 // bank: transaction.payment_name, // replace with actual bank
//                 // account: transaction.no_rekening, // replace with actual account
//                 // reference: 'date', // replace with actual reference
//                 // key: formatDate(transaction.created_at), // replace with actual key
//                 // desc: '' // replace with actual description if needed
//                 transaction : transaction.trx_id,
//                 bank : transaction.no_rekening,
// //                                'account' => $transaction->no_rekening,
// //                                'reference' => 'date',
//                 start_date : transaction.created_at,
//                 end_date : transaction.expired_time,
// //                                'key' => $transaction->created_at->format('Y-m-d'),
// //                            'desc' => $desc // If needed
//             }
            );


            const result = response.data;
            console.log(result)
            console.log(dataTrx)

            if (result.result === 'success' && result.message.length > 0) {
                setMatched(true);
                // Inertia.reload()
                console.log(result);
                // You can also add other logic here if needed when matched
            } else {
                setMatched(false);
                // Inertia.reload()
                console.log(response)
            }
        } catch (error) {
            setError(error.message);
            // Inertia.reload()
            console.log(error.message)
        } finally {
            setLoading(false);
            // Inertia.reload()
            console.log(dataTrx)
        }
    };

    useEffect(() => {
        if (!matched && transaction.payment_status === 'UNPAID' && bank_account !== null) {
            const interval = setInterval(() => {
                checkMutation();
            }, 30000); // 30000ms = 30 seconds

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [matched]);

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
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
            <SigninModal/>
            <SignupModal/>
            <div
                className="grid text-neutral-800 dark:text-white gap-6 w-3/4 mb-10 mx-auto md:grid max-sm:flex max-sm:flex-col">
                <div
                    className="grid grid-cols-2 dark:border-white md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 border-b-2 w-full space-y-2 p-4">
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
                        <div
                            className="grid grid-cols-2 max-sm:grid-cols-1 dark:border-white border-2 rounded-b-lg divide-x">
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
                                        No Handphone
                                    </div>
                                    <div className="flex">
                                        {transaction.phone_number}
                                    </div>
                                </div>
                                {
                                    transaction.user_name !== null && transaction.user_name !== "default_customer_name" && (
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
                                            Status Pembayaran
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
                                            transaction.payment_status === 'REFUND' && (
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
                                        transaction.no_rekening !== null && (
                                            <div>
                                                <div className="flex justify-between">
                                                    <div className="flex py-2">
                                                        No Rekening
                                                    </div>
                                                    <div className="flex font-bold">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <div id="hs-clipboard-basic"
                                                                 className="text-sm font-medium text-primary-800 dark:text-white">
                                                                {transaction.no_rekening}
                                                            </div>
                                                            <button type="button"
                                                                    className="js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary-200 bg-white text-primary-800 shadow-sm hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                                    data-clipboard-target="#hs-clipboard-basic"
                                                                    data-clipboard-action="copy"
                                                                    data-clipboard-success-text="Copied">
                                                                <svg
                                                                    className="js-clipboard-default size-4 group-hover:rotate-6 transition"
                                                                    xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                    strokeWidth="2" strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <rect width="8" height="4" x="8" y="2" rx="1"
                                                                          ry="1"></rect>
                                                                    <path
                                                                        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                                                </svg>

                                                                <svg
                                                                    className="js-clipboard-success hidden size-4 text-blue-600"
                                                                    xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                    strokeWidth="2" strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="flex">
                                                        Nama Rekening
                                                    </div>
                                                    <div className="flex font-bold">
                                                        {bank_account.account_name}
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    }
                                    {
                                        transaction.no_va !== null && (
                                            <div className="flex justify-between">
                                                <div className="flex py-2">
                                                    No Va
                                                </div>
                                                <div className="flex font-bold">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div id="hs-clipboard-basic"
                                                             className="text-sm font-medium text-primary-800 dark:text-white">
                                                            {transaction.no_va}
                                                        </div>
                                                        <button type="button"
                                                                className="js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary-200 bg-white text-primary-800 shadow-sm hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
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
                                            {formatRupiah(parseInt(transaction.amount-transaction.fee))}
                                        </div>
                                    </div>
                                    {transaction.unique_code !== null ? (
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                Kode Unik
                                            </div>
                                            <div className="flex font-bold">
                                                {transaction.unique_code}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                Biaya Admin
                                            </div>
                                            <div className="flex font-bold">
                                                {formatRupiah(transaction.fee)}
                                            </div>
                                        </div>
                                    )}


                                </div>
                                <div className="flex justify-between text-neutral-800">
                                    <div className="dark:text-white py-2 font-bold">Total</div>
                                    {/*{{--                            <div class="font-bold font-bold text-blue-600">Rp. 20.000</div>--}}*/}
                                    <div className="inline-flex items-center gap-x-3">
                                        <div id="hs-clipboard-basic-total"
                                             className="hidden text-sm font-medium text-primary-800 dark:text-white">
                                            {parseInt(transaction.amount) + transaction.unique_code}
                                        </div>
                                        <div
                                            className="text-sm font-medium text-primary-800 dark:text-white">
                                            {formatRupiah(parseInt(transaction.amount) + transaction.unique_code)}
                                        </div>
                                        <button type="button"
                                                className="js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary-200 bg-white text-primary-800 shadow-sm hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                data-clipboard-target="#hs-clipboard-basic-total"
                                                data-clipboard-action="copy"
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
                        <div className='p-2'>
                            Pastikan pada saat transfer Nomor rekening dan Nominal nya sesuai dengan total.
                        </div>
                    </div>
                    <div className="col-span-1 dark:border-white border-2 h-auto rounded-xl">
                        <div
                            className="text-neutral-800 dark:text-white font-bold border-b-2 dark:border-white p-3">Cara
                            Pembayaran {transaction.payment_name}</div>
                        <PaymentInstruction paymentInstruction={paymentInstruction} transaction={transaction}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
