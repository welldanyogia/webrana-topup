import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import {router} from "@inertiajs/react";

function AddProduct({ brand, categories, handleReset,dataStore,setDataStore }) {
    const handleStoreValue = (e) => {
        console.log(dataStore)
        const { id, value, type, checked } = e.target;
        setDataStore(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    console.log(brand)
    console.log(categories)

    const handleStore = async (event) => {
        event.preventDefault();
        console.log(dataStore)

        try {
            router.post('/admin/store/product', dataStore, {
                onSuccess: () => {
                    Inertia.reload({ only: ['flash'] });
                    // Inertia.flash('success', 'Product created successfully!');
                },
                onError: (error) => {
                    console.error('Error saving product:', error);
                    // Inertia.flash('error', 'Failed to create product.');
                }
            });
        } catch (error) {
            console.error('Error saving product:', error);
            // Inertia.flash('error', 'Failed to create product.');
        }

        handleReset();
    };

    return (
        <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div id="hs-basic-collapse-heading"
                     className="hs-collapse hidden w-full overflow-y-scroll transition-[height] duration-300 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                        <div>
                            <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-neutral-200">
                                Add Product {brand.brand_name}
                            </h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-2">
                        <div className="max-w-sm">
                            <label htmlFor="product_name" className="block text-sm font-medium mb-2 dark:text-white">Product Name</label>
                            <input type="text" id="product_name"
                                   value={dataStore.product_name}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Product Name" />
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="brand_id"
                                   className="block text-sm font-medium mb-2 dark:text-white">Brand</label>
                            {/*<input type="text" id="brand_id"*/}
                            {/*       value={dataStore.brand_id}*/}
                            {/*       readOnly={true}*/}
                            {/*       className="hidden py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                            {/*       />*/}
                            <input type="text" id="brand_name"
                                   value={brand.brand_name}
                                   disabled={true}
                                   readOnly={true}
                                   className="py-3 px-4 capitalize block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Brand Name"/>
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="price" className="block text-sm font-medium mb-2 dark:text-white">Price</label>
                            <input type="number" id="price"
                                   value={dataStore.price}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Price" />
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="selling_price" className="block text-sm font-medium mb-2 dark:text-white">Selling Price</label>
                            <input type="number" id="selling_price"
                                   value={dataStore.selling_price}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Selling Price" />
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="buyer_sku_code" className="block text-sm font-medium mb-2 dark:text-white">Buyer SKU Code</label>
                            <input type="text" id="buyer_sku_code"
                                   value={dataStore.buyer_sku_code}
                                   onChange={handleStoreValue}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="Buyer SKU Code" />
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="desc" className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                            <textarea id="desc"
                                      value={dataStore.desc}
                                      onChange={handleStoreValue}
                                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                      placeholder="Description" />
                        </div>
                        <div className="max-w-sm">
                            <label htmlFor="product_status" className="block text-sm font-medium mb-2 dark:text-white">Product
                                Status</label>
                            <select id='product_status'
                                    value={dataStore.product_status}
                                    onChange={handleStoreValue}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                <option value="">Choose</option>
                                <option value={1}>
                                    Active
                                </option>
                                <option value={0}>
                                    Nonactive
                                </option>
                            </select>
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

export default AddProduct;
