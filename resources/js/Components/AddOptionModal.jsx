import React, {useState} from "react";
import {router} from "@inertiajs/react";

export default function AddOptionModal({label,formId}) {
    const [optionName,setOptionName] = useState("")
    const [optionValue,setOptionValue] = useState("")

    function handleInputNameChange(e) {
        setOptionName(e.target.value)
    }
    function handleInputValueChange(e) {
        setOptionValue(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin/storeOption', {
            name: optionName,
            value: optionValue,
            form_input_id: formId
        })
    }
    return (
        <div id="add-option-modal"
             className='hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]'
             data-hs-overlay-keyboard="false">
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <form>
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Tambah Pilihan {label}
                        </h3>
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay="#add-option-modal">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <div className="sm:col-span-3">
                            <label htmlFor="nama-pilihan"
                                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                Nama Pilihan
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
                                      Nama pilihan {label}
                                    </span>
                            </div>
                        </div>

                        <div className="sm:col-span-9">
                            <div className="sm:flex">
                                <input id="nama-pilihan" type="text"
                                    onChange={handleInputNameChange}
                                    value={optionName}
                                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder={`Nama pilihan ${label}`}/>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <div className="sm:col-span-3">
                            <label htmlFor="value-pilihan"
                                   className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                Value Pilihan
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
                                      Value pilihan {label}
                                    </span>
                            </div>
                        </div>

                        <div className="sm:col-span-9">
                            <div className="sm:flex">
                                <input id="value-pilihan" type="text"
                                    onChange={handleInputValueChange}
                                    value={optionValue}
                                       className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder={`Value pilihan ${label}`}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#add-option-modal">
                            Close
                        </button>
                        <button type="button" onClick={handleSubmit} data-hs-overlay="#add-option-modal"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Save changes
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}
