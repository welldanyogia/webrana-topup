import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React, {useEffect, useState} from "react";
import {router, usePage} from "@inertiajs/react";
import SuccessAlert from "@/Components/SuccessAlert.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";

export default function Brand() {
    const {flash, brands, categories} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isAlert, setIsAlert] = useState(true)
    const [brandNames, setBrandNames] = useState({})
    const [keyword, setKeyword] = useState('');
    const [dataStore,setDataStore] = useState({
        brand_name: "",
        category_id:"",
        processed_by:"",
        brand_status:"",
        image_url: ""
    })

    const filteredBrands = brands && keyword.length > 0 ? brands.filter(brand => {
        return (
            brand.brand_name
        ) && (
            brand.brand_name.toLowerCase().includes(keyword.toLowerCase())
        );
    }) : [];

    useEffect(() => {
        // Inisialisasi state dengan nama kategori dari props
        const initialBrandNames = {};
        brands.forEach(brand => {
            initialBrandNames[brand.brand_id] = brand.brand_name;
        });
        setBrandNames(initialBrandNames);
    }, [brands]);

    function reset() {
        setDataStore({
            brand_name: "",
            category_id:"",
            processed_by:"",
            brand_status:"",
            image_url: ""
        })
    }

    const handleInputChange = (e, brandId) => {
        setBrandNames({
            ...brandNames,
            [brandId]: e.target.value,
        });
    };

    function handleStoreValue(e){
        const key =e.target.id
        const value =e.target.value
        setDataStore({
            ...dataStore,
            [key]:value,
        })
    }

    function handleStore(e) {
        e.preventDefault()
        router.post('/admin/brand/store/data',dataStore,{onFinish:reset})
    }

    function handleSync(e) {
        e.preventDefault()
        router.post('/admin/digiflazz/fetch')
    }


    function handleCategoryChange(event, brand) {
        const selectedCategoryId = event.target.value;
        // Lakukan request untuk memperbarui kategori brand
        router.post(`/admin/brand/${brand.brand_id}`, {
            brand_name: brand.brand_name,
            category_id: selectedCategoryId,
            brand_status: brand.brand_status,
            // brand_desc: brand.brand_desc,
            image_url: brand.image_url
        });
    }



    async function handleCheckboxChange(e, brand) {
        e.preventDefault();
        setIsAlert(true);
        setIsCheckboxChecked(e.target.checked);

        try {
            router.post(`/admin/brand/${brand.brand_id}`, {
                brand_name: brand.brand_name,
                category_id: brand.category_id,
                brand_status: e.target.checked,
                processed_by: brand.processed_by,
                image_url: ""
            });
            // ('Response:', response);
        } catch (error) {
            // console.error('Error:', error);
        }
    }

    function handleDelete(e, brand) {
        e.preventDefault();
        router.post(`/admin/brand/delete/${brand.brand_id}`);
    }

    function handleSave(e, brand, brandName) {
        e.preventDefault()
        router.post(`/admin/brand/${brand.brand_id}`, {
            brand_name: brandName,
            category_id: brand.category_id,
            brand_status: brand.brand_status,
            brand_desc: brand.brand_desc,
            image_url: brand.image_url
        });
    }

    function renderBrandRow(brand, index) {
        return (
            <tr key={brand.brand_id} className='hover:bg-gray-100 dark:hover:bg-neutral-700'>
                <td className="size-px whitespace-nowrap">
                    <div className="ps-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{index + 1}</span>
                    </div>
                </td>
                <td className="w-full whitespace-nowrap">
                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="max-w-sm space-y-3">
                                <input type="text"
                                       value={brandNames[brand.brand_id] || ''}
                                       onChange={(e) => handleInputChange(e, brand.brand_id)}
                                       className="py-3 px-4 block w-min-60 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="This is placeholder"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="h-px w-72 whitespace-nowrap">
                    <div className="px-6 py-3">
                                            <span
                                                className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{brand.products_count}</span>
                        {/*    <span*/}
                        {/*        className="block text-sm text-gray-500 dark:text-neutral-500">{user.role}</span>*/}
                    </div>
                </td>
                <td className="h-px w-72 whitespace-nowrap">
                    <div className="px-6 py-3">
                        {/*<!-- Select */}
                        <select data-hs-select='{
                                                          "placeholder": "Select option...",
                                                          "toggleTag": "<button type=\"button\"></button>",
                                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                                          "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                                          "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                                        }' className="hidden"
                                value={brand.category ? brand.category.category_id : ''}
                                onChange={(e) => handleCategoryChange(e, brand)}
                        >
                            <option value="" disabled>Choose</option>
                            {categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                        {/*<!-- End Select */}
                    </div>
                </td>
                <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                                                <span
                                                    className="py-1 px-1.5 uppercase inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                                    {brand.processed_by}
                                                </span>
                    </div>
                </td>
                <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        {
                            brand.brand_status === 1 && (
                                <span
                                    className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                            <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16"
                                                 height="16"
                                                 fill="currentColor" viewBox="0 0 16 16">
                                              <path
                                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                            Active
                                          </span>
                            )
                        }
                        {
                            brand.brand_status === 0 && (
                                <span
                                    className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                         className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    Nonactive
                                </span>
                            )
                        }
                    </div>
                </td>
                <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        <span
                            className="text-sm text-gray-500 dark:text-neutral-500">{new Date(brand.updated_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                            })}</span>
                    </div>
                </td>
                <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-1.5 flex space-x-4">
                        <div className="hs-tooltip flex items-center">
                            <input type="checkbox" checked={brand.brand_status}
                                   onChange={(e) => {
                                       handleCheckboxChange(e, brand)
                                   }}
                                   id="hs-small-switch"
                                   className="relative w-[35px] h-[21px] bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                                                           before:inline-block before:size-4 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                            <div
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                role="tooltip">
                                {brand.brand_status === true ? "Nonactive Brand" : "Activated Brand"}
                            </div>
                        </div>
                        <div>
                            <button type="button"
                                    onClick={(e) => {
                                        handleSave(e, brand, brandNames[brand.brand_id])
                                    }}
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
                                Save
                            </button>
                        </div>
                        <div>
                            <div className="hs-dropdown inline-flex">
                                <button id="hs-dropdown-custom-icon-trigger" type="button"
                                        className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                    <svg
                                        className="flex-none size-4 text-gray-600 dark:text-neutral-500"
                                        xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="1"/>
                                        <circle cx="12" cy="5" r="1"/>
                                        <circle cx="12" cy="19" r="1"/>
                                    </svg>
                                </button>

                                <div
                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 hidden min-w-20 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                                    aria-labelledby="hs-dropdown-custom-icon-trigger">
                                    <button
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                        onClick={() => router.get(`/admin/brand/${brand.brand_id}`)}
                                        type="button">
                                        Detail
                                    </button>
                                    <button
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-red-100 focus:outline-none focus:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red-300 dark:focus:bg-red-700"
                                        type="button" onClick={(e) => {
                                        handleDelete(e, brand)
                                    }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    const BrandsTable = () => {
        const hasFilteredBrands = keyword.length > 0 && filteredBrands.length > 0;

        return (
            <>
                {hasFilteredBrands ? (
                    filteredBrands.map((brand, index) => (
                        renderBrandRow(brand, index)
                    ))
                ) : (
                    brands.map((brand, index) => (
                        renderBrandRow(brand, index)
                    ))
                )}
            </>
        );
    };

    return (
        <AuthenticatedAdmin>
            {
                flash && flash.success && (
                    <SuccessAlert setIsOpen={setIsAlert} isOpen={isAlert} message={flash.success}/>
                )
            }
            {
                flash && flash.error && (
                    <ErrorAlert setIsOpen={setIsAlert} isOpen={isAlert} message={flash.error}/>
                )
            }
            <div className="flex flex-col gap-6">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div id="hs-basic-collapse-heading"
                             className="hs-collapse hidden w-full overflow-y-scroll transition-[height] duration-300 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Add Brand
                                    </h2>
                                </div>
                            </div>
                            <div className="p-6 space-y-2">
                                <div className="max-w-sm">
                                    <label htmlFor="brand_name"
                                           className="block text-sm font-medium mb-2 dark:text-white">Name</label>
                                    <input type="text" id="brand_name"
                                           value={dataStore.brand_name}
                                           onChange={(e) => handleStoreValue(e)}
                                           className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Name"/>
                                </div>
                                <div className="max-w-sm">
                                    <label htmlFor="category_id"
                                           className="block text-sm font-medium mb-2 dark:text-white">Category</label>
                                    <select data-hs-select='{
                                                          "placeholder": "Select option...",
                                                          "toggleTag": "<button type=\"button\"></button>",
                                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                                          "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                                          "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                                        }' className="hidden"
                                            id='category_id'
                                            onChange={(e) => handleStoreValue(e)}
                                            value={dataStore.category_id}
                                        // onChange={(e) => handleCategoryChange(e, brand)}
                                    >
                                        <option value="">Choose</option>
                                        {categories.map((category) => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="max-w-sm">
                                    <label htmlFor="processed_by"
                                           className="block text-sm font-medium mb-2 dark:text-white">Processed
                                        By</label>
                                    {/*<!-- Select */}
                                    <select data-hs-select='{
                                              "placeholder": "Select option...",
                                              "toggleTag": "<button type=\"button\"></button>",
                                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                              "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                              "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                            }' className="hidden" id='processed_by'
                                            onChange={(e) => handleStoreValue(e)}
                                            value={dataStore.processed_by}

                                    >
                                        <option value="">Choose</option>
                                        <option value='digiflazz'>Digiflazz</option>
                                        <option value='manual'>Manual</option>
                                    </select>
                                    {/*// <!-- End Select -->*/}
                                </div>
                                <div className="max-w-sm">
                                    <label htmlFor="brand_status"
                                           className="block text-sm font-medium mb-2 dark:text-white">
                                        Status
                                    </label>
                                    {/*<!-- Select */}
                                    <select id='brand_status'
                                            data-hs-select='{
                                              "placeholder": "Select option...",
                                              "toggleTag": "<button type=\"button\"></button>",
                                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                              "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                              "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                            }' className="hidden"
                                            onChange={(e) => handleStoreValue(e)}
                                            value={dataStore.brand_status}
                                    >
                                        <option value="">Choose</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>NonActive</option>
                                    </select>
                                    {/*// <!-- End Select -->*/}
                                </div>
                                <div>
                                    <button type="button"
                                            onClick={event => handleStore(event)}
                                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Save
                                    </button>
                                </div>
                            </div>
                            {/*</div>*/}


                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    {/*<!-- Header >*/}
                    <div
                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                Brand
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                Add brands, edit and more.
                            </p>
                        </div>

                        <div>
                            <div className="inline-flex gap-x-2">
                                <div className="sm:block">
                                    <label htmlFor="icon" className="sr-only">Search</label>
                                    <div className="relative min-w-72 md:min-w-80">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                            <svg
                                                className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-400"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="m21 21-4.3-4.3"/>
                                            </svg>
                                        </div>
                                        <input type="text" id="icon" name="icon"
                                               className="py-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                               placeholder="Search"
                                               onChange={(e) => setKeyword(e.target.value)}/>
                                    </div>
                                </div>
                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                   href="#" onClick={handleSync}>
                                    Sync with Digiflazz
                                </a>
                                <button type="button"
                                        onClick={reset}
                                        className="hs-collapse-toggle hs-collapse-open:bg-red-700 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                        id="hs-basic-collapse" data-hs-collapse="#hs-basic-collapse-heading">
                                    <div className="hs-collapse-open:hidden flex">
                                        Add Brand
                                    </div>
                                    <div className="hs-collapse-open:block hidden flex">
                                        Close
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/*<AddCategoryModal isOpen={isAddModalOpen} onClose={closeAddModal}/>*/}
                    </div>
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div
                                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">

                                <table
                                    className="min-w-full overflow-x-auto divide-y divide-gray-200 dark:divide-neutral-700">
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

                                        <th scope="col" className="ps-6 lg:ps-3 py-3 text-start">
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
                                            Total Product
                                          </span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Category
                                          </span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Process
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
                                            Updated
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-end">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs mx-auto font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Action
                                          </span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    BrandsTable()
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
