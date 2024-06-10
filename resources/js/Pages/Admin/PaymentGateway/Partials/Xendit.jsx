import TripayTable from "@/Components/TripayTable.jsx";
import React, {useState} from "react";
import {router} from "@inertiajs/react";

export default function Xendit({ipAddress, xendit}) {
    const [values, setValues] = useState({ // Form fields
        api_key: xendit?.api_key
    });

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin/paymentgateway/xendit/store', values)
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <div className="px-4 py-10 space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                        Xendit
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='grid sm:grid-cols-12 gap-2 sm:gap-6'>
                        {/*Ip Address*/}

                        <div className="sm:col-span-3">
                            <label htmlFor="ip_address"
                                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                IP Address
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
                                      IP Address Server anda.
                                    </span>
                            </div>
                        </div>
                        {/*<!-- End Col */}


                        <div className="sm:col-span-9">
                            <div className="sm:flex">
                                <input type="hidden" id="hs-clipboard-tooltip-on-hover"
                                       value={ipAddress}/>

                                <button type="button"
                                        className="js-clipboard-example [--is-toggle-tooltip:false] hs-tooltip relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                        data-clipboard-target="#hs-clipboard-tooltip-on-hover"
                                        data-clipboard-action="copy" data-clipboard-success-text="Copied">
                                    {ipAddress}
                                    <span className="border-s ps-3.5 dark:border-neutral-700">
                                            <svg className="js-clipboard-default size-4 group-hover:rotate-6 transition"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                                              <path
                                                  d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            </svg>

                                            <svg className="js-clipboard-success hidden size-4 text-blue-600 rotate-6"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                              <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                          </span>

                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                            <span className="js-clipboard-success-text">Copy</span>
                                          </span>
                                </button>
                            </div>
                        </div>
                        {/*<!-- End Col */}

                        {/*API Key*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="api_key"
                                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                Secret API Key
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
                                      Secret API Key Xendit anda
                                    </span>
                            </div>
                        </div>
                        {/*<!-- End Col */}

                        <div className="sm:col-span-9">
                            <div className="sm:flex">
                                <input id="api_key" type="text" onChange={handleChange}
                                       value={values.api_key}
                                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="Secret API Key Xendit"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end gap-x-2">
                        <button type="submit"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Save changes
                        </button>
                    </div>
                </form>

                {/*<form onSubmit={handleSubmit}>*/}
                {/*    /!*<!-- Grid *!/*/}
                {/*    <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">*/}
                {/*        <div className="sm:col-span-3">*/}
                {/*            <label htmlFor="merchant_code_tripay"*/}
                {/*                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">*/}
                    {/*                Merchant Code*/}
                    {/*            </label>*/}
                    {/*            <div className="hs-tooltip inline-block">*/}
                    {/*                <button type="button" className="hs-tooltip-toggle ms-1">*/}
                    {/*                    <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"*/}
                    {/*                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                    {/*                         fill="currentColor" viewBox="0 0 16 16">*/}
                    {/*                        <path*/}
                    {/*                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>*/}
                    {/*                        <path*/}
                    {/*                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>*/}
                    {/*                    </svg>*/}
                    {/*                </button>*/}
                    {/*                <span*/}
                    {/*                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"*/}
                    {/*                    role="tooltip">*/}
                    {/*                          Merchant code tripay anda*/}
                    {/*                        </span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-9">*/}
                    {/*            <div className="sm:flex">*/}
                    {/*                <input id="merchant_code_tripay" type="text" onChange={handleChange}*/}
                    {/*                       value={values.merchant_code_tripay}*/}
                    {/*                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                    {/*                       placeholder="Merchand ID Tripay"/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}


                    {/*        /!*APIKey*!/*/}
                    {/*        /!*<!-- End Col *!/*/}
                    {/*        <div className="sm:col-span-3">*/}
                    {/*            <label htmlFor="api_key_tripay"*/}
                    {/*                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">*/}
                    {/*                API Key*/}
                    {/*            </label>*/}
                    {/*            <div className="hs-tooltip inline-block">*/}
                    {/*                <button type="button" className="hs-tooltip-toggle ms-1">*/}
                    {/*                    <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"*/}
                    {/*                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                    {/*                         fill="currentColor" viewBox="0 0 16 16">*/}
                    {/*                        <path*/}
                    {/*                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>*/}
                    {/*                        <path*/}
                    {/*                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>*/}
                    {/*                    </svg>*/}
                    {/*                </button>*/}
                    {/*                <span*/}
                    {/*                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"*/}
                    {/*                    role="tooltip">*/}
                    {/*                          API key Tripay anda*/}
                    {/*                        </span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-9">*/}
                    {/*            <div className="sm:flex">*/}
                    {/*                <input id="api_key_tripay" type="text" onChange={handleChange}*/}
                    {/*                       value={values.api_key_tripay}*/}
                    {/*                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                    {/*                       placeholder="API Key Tripay"/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-3">*/}
                    {/*            <label htmlFor="private_key_tripay"*/}
                    {/*                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">*/}
                    {/*                Private Key*/}
                    {/*            </label>*/}
                    {/*            <div className="hs-tooltip inline-block">*/}
                    {/*                <button type="button" className="hs-tooltip-toggle ms-1">*/}
                    {/*                    <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"*/}
                    {/*                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                    {/*                         fill="currentColor" viewBox="0 0 16 16">*/}
                    {/*                        <path*/}
                    {/*                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>*/}
                    {/*                        <path*/}
                    {/*                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>*/}
                    {/*                    </svg>*/}
                    {/*                </button>*/}
                    {/*                <span*/}
                    {/*                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"*/}
                    {/*                    role="tooltip">*/}
                    {/*                          Private key Tripay anda*/}
                    {/*                        </span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-9">*/}
                    {/*            <div className="sm:flex">*/}
                    {/*                <input id="private_key_tripay" type="text" onChange={handleChange}*/}
                    {/*                       value={values.private_key_tripay}*/}
                    {/*                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                    {/*                       placeholder="Private Key Tripay"/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-3">*/}
                    {/*            <label htmlFor="api_key_digiflazz"*/}
                    {/*                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">*/}
                    {/*                Mode*/}
                    {/*            </label>*/}
                    {/*            <div className="hs-tooltip inline-block">*/}
                    {/*                <button type="button" className="hs-tooltip-toggle ms-1">*/}
                    {/*                    <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"*/}
                    {/*                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                    {/*                         fill="currentColor" viewBox="0 0 16 16">*/}
                    {/*                        <path*/}
                    {/*                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>*/}
                    {/*                        <path*/}
                    {/*                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>*/}
                    {/*                    </svg>*/}
                    {/*                </button>*/}
                    {/*                <span*/}
                    {/*                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"*/}
                    {/*                    role="tooltip">*/}
                    {/*                          Mode Tripay anda*/}
                    {/*                        </span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*        <div className="sm:col-span-9">*/}
                    {/*            /!*<!-- Select *!/*/}
                    {/*            <select id='is_production' data-hs-select='{*/}
                    {/*                              "placeholder": "Select mode...",*/}
                    {/*                              "toggleTag": "<button type=\"button\"></button>",*/}
                    {/*                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",*/}
                    {/*                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",*/}
                    {/*                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",*/}
                    {/*                              "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",*/}
                    {/*                              "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"*/}
                    {/*                            }' className="hidden"*/}
                    {/*                    onChange={handleChange}*/}
                    {/*                    value={values.is_production}>*/}
                    {/*                <option value="">Choose</option>*/}
                    {/*                <option value={0}>Development</option>*/}
                    {/*                <option value={1}>Production</option>*/}
                    {/*            </select>*/}
                    {/*            /!*<!-- End Select *!/*/}
                    {/*        </div>*/}
                    {/*        /!*<!-- End Col *!/*/}

                    {/*    </div>*/}
                    {/*    /!*<!-- End Grid *!/*/}
                    {/*    <div className="mt-5 flex justify-end gap-x-2">*/}
                    {/*        <button type="submit"*/}
                    {/*                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">*/}
                    {/*            Save changes*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
            </div>

        </div>
)
}
