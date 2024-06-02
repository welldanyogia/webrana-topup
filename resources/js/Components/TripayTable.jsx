import React, {useState} from "react";
import {router, usePage} from "@inertiajs/react";

export default function TripayTable(){
    const {flash, tripayPaymentChannel} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    function handleSync(e) {
        e.preventDefault()
        router.post('/tripay/getpaymentmethod')
    }
    function handleDismiss() {
        setAlertVisible(false);
    }
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    function formatPercent(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value / 100);
    }

    // Function to open the modal
    function openAddModal() {
        setIsAddModalOpen(true);
    }

    // Function to close the modal
    function closeAddModal() {
        setIsAddModalOpen(false);
    }
    return (
        <div
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            {/*<!-- Header >*/}
            <div
                className="px-6 py-4  grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                        Payment Method
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                        Add payment methods, edit and more.
                    </p>
                </div>

                <div>
                    <div className="inline-flex gap-x-2">
                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                           href="#" onClick={handleSync}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-4">
                                <path fillRule="evenodd"
                                      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                                      clipRule="evenodd"/>
                            </svg>

                            Sync Tripay Payment Method
                        </a>

                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
            <table className="min-w-full divide-y divide-gray-400 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr>
                    <th scope="col" className="ps-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                No
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                Icon
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
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
                                Group
                            </span>
                        </div>
                    </th>


                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                Code
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
                                Fee Merchant
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                Fee Customer
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                Total Fee
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-end"></th>
                </tr>
                </thead>
                <tbody>
                {tripayPaymentChannel && tripayPaymentChannel.map((paymentMethod, index) => (
                    <tr key={paymentMethod.id}>
                        <td className="size-px whitespace-nowrap">
                            <div className="ps-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{index + 1}</span>
                            </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                <div className="flex items-center gap-x-3">
                                    <img
                                        className="block text-sm font-semibold text-gray-800 dark:text-neutral-200"
                                        src={paymentMethod.icon_url} alt={paymentMethod.name}>
                                    </img>
                                </div>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{paymentMethod.name}</span>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{paymentMethod.group}</span>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{paymentMethod.code}</span>
                            </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className={`py-1 px-1.5 inline-flex rounded-full items-center gap-x-1 text-xs font-medium ${paymentMethod.active ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500' : 'bg-gray-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'}`}>
                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg"
                                         width="16" height="16" fill="currentColor"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    {paymentMethod.active ? 'Active' : 'Nonactive'}
                                </span>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formatRupiah(paymentMethod.fee_merchant_flat)} + {formatPercent(paymentMethod.fee_merchant_percent)}</span>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formatRupiah(paymentMethod.fee_customer_flat)} + {formatPercent(paymentMethod.fee_customer_percent)}</span>
                            </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                                <span
                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formatRupiah(paymentMethod.total_fee_flat)} + {formatPercent(paymentMethod.total_fee_percent)}</span>
                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
