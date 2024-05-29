import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import Alert from "@/Components/Alert.jsx";
import TripayTable from "@/Components/TripayTable.jsx";


export default function PaymentGateway(props) {
    const {tripay, flash} = props
    const [alertVisible, setAlertVisible] = useState(true);
    const [values, setValues] = useState({ // Form fields
        merchant_code_tripay: tripay?.merchant_code,
        api_key_tripay: tripay?.api_key,
        private_key_tripay : tripay?.private_key
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin/paymentgateway/store', values)
    }
    function handleDismiss() {
        setAlertVisible(false);
    }

    return (
        <AuthenticatedAdmin
            auth={props.auth}
            error={props.error}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                Konfigurasi Payment Gateway
            </h2>
            }
        >
            {flash && flash.message && alertVisible && (
                <Alert onDismiss={handleDismiss}>
                    {flash.message}
                </Alert>
            )}
            Konfigurasi Tripay
            {/*<!-- Card Section */}
            <div className="px-4 py-10 space-y-6 sm:px-6 lg:px-8">
                {/*<!-- Card */}
                <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Tripay
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/*<!-- Grid */}
                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="merchant_code_tripay"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Merchant Code
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Merchant code tripay anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="merchant_code_tripay" type="text" onChange={handleChange}
                                           value={values.merchant_code_tripay}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Username Digiflazz"/>
                                </div>
                            </div>


                            {/*APIKey*/}
                            {/*<!-- End Col */}
                            <div className="sm:col-span-3">
                                <label htmlFor="api_key_tripay"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    API Key
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      API key Tripay anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="api_key_tripay" type="text" onChange={handleChange}
                                           value={values.api_key_tripay}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Username Digiflazz"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-3">
                                <label htmlFor="private_key_tripay"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Private Key
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Private key Tripay anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="private_key_tripay" type="text" onChange={handleChange}
                                           value={values.private_key_tripay}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="API Key Digiflazz"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                        </div>
                        {/*<!-- End Grid */}
                        <div className="mt-5 flex justify-end gap-x-2">
                            <button type="submit"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
                {/*<!-- End Card */}
            {/*    Table    */}
                <TripayTable/>
            </div>
            {/*<!-- End Card Section */}
        </AuthenticatedAdmin>
    )
}
