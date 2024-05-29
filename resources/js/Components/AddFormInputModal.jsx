import React, {useState} from "react";
import {router} from "@inertiajs/react";

export default function AddFormInputModal({brand, brandId}) {
    const [inputName, setInputName] = useState("")
    const [inputType, setInputType] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        console.log(inputName)
        console.log(inputType)
        console.log(brandId)

        router.post('/api/addform', {
            name: inputName,
            type: inputType,
            brand_id: brandId
        })


        // const response = await axios.post('/api/addform', {
        //     name: inputName,
        //     type: inputType,
        //     brand_id: brandId
        // })
        // if (response.success) {
        //     console.log(response)
        // }
    }

    function handleTypeChange(event) {
        setInputType(event.target.value)
        // setIsSelectType(event.target.value === "select");
    }

    function handleInputNameChange(event) {
        setInputName(event.target.value)
    }

    // function handleInputTypeChange(event){
    //     setInputType(event.target.value)
    // }
    // function handleOptionNameChange(index, value) {
    //     const newOptionNames = [...optionNames];
    //     newOptionNames[index] = value;
    //     setOptionNames(newOptionNames);
    // }
    // function handleOptionValueChange(index, value) {
    //     const newOptionValues = [...optionValues];
    //     newOptionValues[index] = value;
    //     setOptionValues(newOptionValues);
    // }
    return (
        <div id="hs-static-backdrop-modal-form"
             className='hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]'
             data-hs-overlay-keyboard="false">
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Tambah Form Input {brand}
                        </h3>
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay="#hs-static-backdrop-modal-form">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <div className="w-full">
                            <label htmlFor="input-text"
                                   className="block text-sm font-medium mb-2 dark:text-white">Nama Form</label>
                            <input type="text" id="input-text" onChange={handleInputNameChange}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Nama Form"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="form-type"
                                   className="block text-sm font-medium mb-2 dark:text-white">Type Form</label>
                            <select id="form-type" onChange={handleTypeChange}
                                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                <option selected>Open this select menu</option>
                                <option value='number'>Number</option>
                                <option value='text'>Text</option>
                                <option value='select'>Select</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#hs-static-backdrop-modal-form">
                            Close
                        </button>
                        <button type="button" onClick={handleSubmit} data-hs-overlay="#hs-static-backdrop-modal-form"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
