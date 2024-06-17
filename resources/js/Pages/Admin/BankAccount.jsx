import React, {useEffect, useState} from "react";
import {router, usePage} from "@inertiajs/react";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import BankAccountTable from "@/Components/BankAccountTable.jsx";

export default function BankAccount(props) {
    const {ipAddress, latestBT} = props
    const [values, setValues] = useState({ // Form fields
        id:latestBT?.id,
        api_key: latestBT?.api_key,
        status:latestBT?.status
    });
    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin/bank/store', values)
    }

    function handleChange(e) {
        const { id, value, checked, type } = e.target;
        setValues(values => ({
            ...values,
            [id]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    }

    function handleUpdateStatus(e) {
        e.preventDefault()
        router.post(route('admin.bankaccount.updateStatus'), {
            id:values.id,
            status:e.target.checked
        })
    }

    return (
        <AuthenticatedAdmin
            auth={props.auth}
            error={props.error}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                Konfigurasi Bank Transfer
            </h2>
            }
        >
            <div className="px-4 py-10 space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                    <div className="mb-8 flex flex-row justify-between">
                        <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Bank Transfer
                        </h2>
                        </div>
                        <div>
                        <input type="checkbox" id="status"
                               checked={values.status === 1}
                               onChange={(e)=> {
                                   handleChange(e)
                                   handleUpdateStatus(e)
                               }}
                               className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                        before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                        <label htmlFor="status" className="sr-only">switch</label>
                        </div>
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
                                    Personal Token Moota App
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
                                    Personal Token Moota App anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="api_key" type="text" onChange={handleChange}
                                           value={values.api_key}
                                           disabled={values.status === 0}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Personal Token Moota App"/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-start gap-x-2">
                        <span className='text-sm'>
                            Jika belum memiliki akun Moota App, silahkan daftar{' '}
                            <a
                                href={route('admin.banktransfer.register')}
                                className='underline text-blue-400 hover:text-blue-700'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                disini
                            </a>
                        </span>
                        </div>
                        <div className="mt-5 flex justify-end gap-x-2">
                            <button type="submit"
                                    disabled={values.status === 0}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </form>

                </div>
                {values.status===1 && <BankAccountTable />}
            </div>
        </AuthenticatedAdmin>
    )
}
