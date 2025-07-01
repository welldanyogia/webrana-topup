import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import {router} from "@inertiajs/react";

function AddAccount({ brand, categories,products, handleReset,dataStore,setDataStore }) {
    const handleStoreValue = (e) => {
        const { id, value, type, checked } = e.target;
        setDataStore(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleStore = async (event) => {
        event.preventDefault();

        // Ensure duration is an integer
        let duration = parseInt(dataStore.duration, 10);
        if (isNaN(duration)) {
            alert('Duration must be a valid number');
            return;
        }

        // Prepare the data to be sent
        const accountData = {
            ...dataStore,
            duration, // Ensure the duration is in integer format
        };


        // Post the data using Inertia.js
        try {
            const response = await axios.post('/admin/store/account', accountData);

            // Handle success (You can reset form or show a success message)
            handleReset();  // Reset the form
        } catch (error) {
            alert('Failed to save account. Please try again.');
        }
    };

    return (
        <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div id="hs-acc-basic-collapse-heading"
                     className="hs-collapse hidden w-full overflow-y-scroll transition-[height] duration-300 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                        <div>
                            <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-neutral-200">
                                Add Account {brand.brand_name}
                            </h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-2">
                        <div className="max-w-sm">
                            <label htmlFor="email"
                                   className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                            <input type="text" id="email"
                                   value={dataStore.email}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Email"/>
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="password"
                                   className="block text-sm font-medium mb-2 dark:text-white">Password</label>
                            {/*<input type="text" id="brand_id"*/}
                            {/*       value={dataStore.brand_id}*/}
                            {/*       readOnly={true}*/}
                            {/*       className="hidden py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                            {/*       />*/}
                            <input type="text" id="password"
                                   value={dataStore.password}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 capitalize block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Password"/>
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="profile"
                                   className="block text-sm font-medium mb-2 dark:text-white">Profile</label>
                            <input type="text" id="profile"
                                   value={dataStore.profile}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Profile"/>
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="pin"
                                   className="block text-sm font-medium mb-2 dark:text-white">PIN</label>
                            <input type="number" id="pin"
                                   value={dataStore.pin}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="PIN"/>
                        </div>
                        <label htmlFor="type"
                               className="block text-sm font-medium mb-2 dark:text-white">Type</label>
                        <div className="max-w-sm">
                            <select data-hs-select='{
                                          "placeholder": "Choose ACC Type...",
                                          "toggleTag": "<button type=\"button\"></button>",
                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-primary-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-primary-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700",
                                          "optionClasses": "py-2 px-4 w-full text-sm text-primary-800 cursor-pointer hover:bg-primary-100 rounded-lg focus:outline-none focus:bg-primary-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' id='type'
                                    onChange={handleStoreValue}
                            >
                                <option value="">Choose ACC Type</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Permanent">Permanent</option>

                            </select>

                            <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-4 text-primary-500 dark:text-neutral-500"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5"></path>
                                    <path d="m7 9 5-5 5 5"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="duration"
                                   className="block text-sm font-medium mb-2 dark:text-white">Duration</label>
                            <input type="text" id="duration"
                                   value={dataStore.duration}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Buyer SKU Code"/>
                        </div>
                        <label htmlFor="product_id"
                               className="block text-sm font-medium mb-2 dark:text-white">Product</label>
                        <div className="max-w-sm">
                            <select data-hs-select='{
                                          "placeholder": "Choose Product...",
                                          "toggleTag": "<button type=\"button\"></button>",
                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-primary-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-primary-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700",
                                          "optionClasses": "py-2 px-4 w-full text-sm text-primary-800 cursor-pointer hover:bg-primary-100 rounded-lg focus:outline-none focus:bg-primary-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' id='product_id'
                                onChange={handleStoreValue}
                            >
                                <option value="">Choose Product</option>
                                {
                                    products && products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.product_name}</option>
                                    ))
                                }
                            </select>

                            <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-4 text-primary-500 dark:text-neutral-500"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5"></path>
                                    <path d="m7 9 5-5 5 5"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <button type="button"
                                    onClick={handleStore}
                                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddAccount;
