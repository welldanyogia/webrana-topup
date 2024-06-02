import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React, {useState, useRef, useEffect} from "react";
import {router, usePage} from "@inertiajs/react";
import '../../../css/app.css'
import AddSelectInput from "@/Components/AddSelectInput.jsx";
import AddOptionModal from "@/Components/AddOptionModal.jsx";
import AddTextInput from "@/Components/AddTextInput.jsx";
import AddNumberInput from "@/Components/AddNumberInput.jsx";
import SuccessAlert from "@/Components/SuccessAlert.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";
import AddProduct from "@/Components/AddProduct.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function DetailBrand() {
    const {flash, brand, categories, products, formInputs} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(brand && brand[0]?.brand_status === 1);
    const [brandName, setBrandName] = useState(brand && brand.brand_name);
    const brandId = brand[0]?.brand_id
    const [alertMessage, setAlertMessage] = useState('');
    const [brandImage, setBrandImage] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const [selectValue, setSelectValue] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(true)
    const [productNames, setProductNames] = useState({})
    const [productSellingPrices, setProductSellingPrices] = useState({})
    const [values, setValues] = useState({
        brand_name: brand.brand_name,
        category_id: brand.category.category_id,
        brand_image: brand.image_url,
        brand_status: brand.brand_status,
        processed_by: brand.processed_by,
        mass_profit: brand.mass_profit,
        mass_profit_status: brand.mass_profit_status
    });
    const [dataStore, setDataStore] = useState({
        product_name: '',
        brand_id: brand.brand_id,
        type_name: '',
        seller_name: 'default',
        price: '',
        selling_price: '',
        buyer_sku_code: '',
        buyer_product_status: true,
        seller_product_status: true,
        unlimited_stock: false,
        stock: 'default',
        multi: false,
        start_cut_off: 'default',
        end_cut_off: 'default',
        desc: '',
        product_status: ''
    });

    const handleDelete = async (productId) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await router.post(`/admin/product/${productId}/destroy`, {
                    onSuccess: () => {
                        Inertia.reload({ only: ['flash'] });
                        // Inertia.flash('success', 'Product deleted successfully!');
                    },
                    onError: (error) => {
                        console.error('Error deleting product:', error);
                        // Inertia.flash('error', 'Failed to delete product.');
                    }
                });
            } catch (error) {
                console.error('Error deleting product:', error);
                Inertia.flash('error', 'Failed to delete product.');
            }
        }
    };


    const handleReset = () => {
        setDataStore({
            product_name: '',
            brand_id: brand.brand_id,
            type_name: '',
            seller_name: 'default',
            price: '',
            selling_price: '',
            buyer_sku_code: '',
            buyer_product_status: true,
            seller_product_status: true,
            unlimited_stock: false,
            stock: 'default',
            multi: false,
            start_cut_off: 'default',
            end_cut_off: 'default',
            desc: '',
            product_status: ''
        });
    };

    useEffect(() => {
        // Inisialisasi state dengan nama kategori dari props
        const initialProductNames = {};
        brand.products.forEach(product => {
            initialProductNames[product.id] = product.product_name;
        });
        setProductNames(initialProductNames);
    }, [brand.products]);

    useEffect(() => {
        // Inisialisasi state dengan nama kategori dari props
        const initialProductSellingPrices = {};
        brand.products.forEach(product => {
            initialProductSellingPrices[product.id] = product.selling_price;
        });
        setProductSellingPrices(initialProductSellingPrices);
    }, [brand.products]);

    function handleStoreValue(e) {
        const key = e.target.id
        const value = e.target.value

        if (key === 'mass_profit_status') {
            // console.log(e.target.checked)
            setValues({
                ...values,
                [key]: e.target.checked ? 1 : 0,
            })
        }
        if (key !== 'brand_image' && key !== 'mass_profit_status') {
            setValues({
                ...values,
                [key]: value,
            });
        }
    }


    // console.log(brand)
    // console.log(brand.mass_profit_status === 1)
    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    function handleBrandImageChange(e) {
        setBrandImage(e.target.files[0]);
    }

    async function handleCheckboxChange(event) {
        event.preventDefault()
        // setIsCheckboxChecked(event.target.checked);
        try {
            router.post(`/api/brands/${brand.brand_id}`,
                {
                    brand_name: brandName,
                    category_id: brand.category_id,
                    brand_status: event.target.checked,
                    brand_desc: brand.brand_desc,
                    image_url: brand.image_url
                });

            // console.log('Response:', response.data);
            // setAlertMessage('Brand successfully saved.');
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            // console.error('Error:', error);
            setAlertMessage(`${error}`);
            // Handle error, e.g., show error message to user
        }
    }


    const handleSelect = (event) => {
        setSelectValue(event.target.value);
    };


    function handleBrandNameChange(e) {
        setBrandName(e.target.value);
    }

    function handleSync(e) {
        e.preventDefault()
        router.post('/admin/digiflazz/fetch')
    }

    function handleDismiss() {
        setAlertVisible(false);
    }

    function openAddModal() {
        setIsAddModalOpen(true)
        // console.log('category : ' + isAddModalOpen)
    }

    // Function to close the modal
    function closeAddModal() {
        setIsAddModalOpen(false);
        // console.log(isAddModalOpen)
    }

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data
        const formData = new FormData();
        if (values.brand_name !== brand.brand_name) formData.append('brand_name', values.brand_name);
        if (values.category_id !== brand.category_id) formData.append('category_id', values.category_id);
        if (brandImage) formData.append('brand_image', brandImage); // Assuming this is a file input or URL
        if (values.brand_status !== brand.brand_status) formData.append('brand_status', values.brand_status);
        if (values.processed_by !== brand.processed_by) formData.append('processed_by', values.processed_by);
        if (values.mass_profit !== brand.mass_profit) formData.append('mass_profit', values.mass_profit);
        if (values.mass_profit_status !== brand.mass_profit_status) formData.append('mass_profit_status', values.mass_profit_status);

        try {
            router.post(`/api/brands/${brand.brand_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // setAlertMessage('Brand successfully saved.');
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            setAlertMessage(`Error: ${error.response?.data?.message || error.message}`);
            // Handle error, e.g., show error message to user
        }
    };

    const handleInputNameChange = (e, productId) => {
        setProductNames({
            ...productNames,
            [productId]: e.target.value,
        });
    };
    const handleInputSellingPriceChange = (e, productId) => {
        setProductSellingPrices({
            ...productSellingPrices,
            [productId]: e.target.value,
        });
    };

    function handleCheckboxProductChange(e, product) {
        e.preventDefault()
        console.log(product)
        setIsCheckboxChecked(e.target.checked);
        router.post(`/admin/product/${product.id}`, {
            product_name: product.product_name,
            price: product.price,
            selling_price: product.selling_price,
            product_status: e.target.checked
        })
    }

    function handleSave(e, product) {
        e.preventDefault()
        router.post(`/admin/product/${product.id}`,{
            product_name: productNames[product.id],
            price:product.price,
            product_status:product.product_status,
            selling_price: productSellingPrices[product.id]
        })
    }

    return (
        <AuthenticatedAdmin>
            {
                flash && flash.success && (
                    <SuccessAlert setIsOpen={setIsOpen} isOpen={isOpen} message={flash.success}/>
                )
            }
            {
                flash && flash.error && (
                    <ErrorAlert setIsOpen={setIsOpen} isOpen={isOpen} message={flash.error}/>
                )
            }
            <div className="flex flex-col text-neutral-800 dark:text-white">
                <div className="-m-1.5 overflow-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle overflow-auto">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 max-sm:flex md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                {/*<div>*/}
                                {brand && (
                                    <div key={brand.brand_id} className='flex gap-6'>
                                        <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-neutral-200">{brand.brand_name}</h2>
                                        <span
                                            className="py-1 px-1.5 uppercase inline-flex items-center gap-x-1 text-xs font-medium bg-green-200 text-green-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                            {brand.processed_by}
                                        </span>

                                    </div>
                                )}

                                {/*</div>*/}

                                <div>
                                    <div className="inline-flex gap-x-2">

                                        <div className="hs-tooltip flex items-center">
                                            <input type="checkbox" checked={brand.brand_status === 1}
                                                   onChange={(e) => {
                                                       handleCheckboxChange
                                                       handleStoreValue(e)
                                                   }} id="brand_status" className="hs-tooltip-toggle relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                                            before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                                            <label htmlFor="hs-tooltip-example"
                                                   className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                {values.brand_status === 1 ? "Brand Active" : "Brand Nonactive"}
                                            </label>
                                            <div
                                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                                role="tooltip">
                                                {values.brand_status === 1 ? "Nonactive Brand" : "Activated Brand"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-2 max-sm:grid-cols-1'>
                                    <div className='col-span-1 p-6 space-y-6'>
                                        <div className="max-w-sm">
                                            <label htmlFor="brand_name"
                                                   className="block text-sm font-medium mb-2 dark:text-white">Brand
                                                Name</label>
                                            <input type="text" id="brand_name"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   placeholder="Brand Name"
                                                   value={values.brand_name}
                                                   onChange={(e) => {
                                                       handleStoreValue(e)
                                                   }}
                                            />
                                        </div>
                                        <div className="max-w-sm">
                                            <label htmlFor="image_url"
                                                   className="block text-sm font-medium mb-2 dark:text-white">Brand
                                                Image</label>
                                            <input type="file" id='image_url'
                                                   accept="image/*"
                                                   onChange={handleBrandImageChange}
                                                   className="block w-full text-sm text-gray-500
                                                    file:me-4 file:py-2 file:px-4
                                                    file:rounded-lg file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-600 file:text-white
                                                    hover:file:bg-blue-700
                                                    file:disabled:opacity-50 file:disabled:pointer-events-none
                                                    dark:text-neutral-500
                                                    dark:file:bg-blue-500
                                                    dark:hover:file:bg-blue-400
                                                  "/>
                                        </div>
                                        <div className="max-w-sm">

                                            {brand && (
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium mb-2 dark:text-white">
                                                        Category
                                                    </label>
                                                    <select id='category_id'
                                                            data-hs-select='{
                                                          "placeholder": "Select option...",
                                                          "toggleTag": "<button type=\"button\"></button>",
                                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                                          "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                                          "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                                        }' className="hidden"
                                                            value={values.category_id ? values.category_id : ''}
                                                            onChange={(e) => {
                                                                handleStoreValue(e)
                                                            }}
                                                    >
                                                        <option value="" disabled>Choose</option>
                                                        {categories.map((category) => (
                                                            <option key={category.category_id}
                                                                    value={category.category_id}>
                                                                {category.category_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div className="max-w-sm">
                                            <label htmlFor="processed_by"
                                                   className="block text-sm font-medium mb-2 dark:text-white">
                                                Process
                                            </label>
                                            {/*<!-- Select */}
                                            <select id='processed_by'
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
                                                    value={values.processed_by}
                                            >
                                                <option value="">Choose</option>
                                                <option value='digiflazz'>Digiflazz</option>
                                                <option value='manual'>Manual</option>
                                            </select>
                                            {/*// <!-- End Select -->*/}
                                        </div>
                                        <div className="max-w-sm space-y-3">
                                            <div className='space-y-2'>
                                                <label htmlFor="mass_profit"
                                                       className="block text-sm font-medium mb-2 dark:text-white">Profit</label>
                                                <div className="relative">
                                                    <input type="number" id="mass_profit"
                                                           disabled={!values.mass_profit_status}
                                                           onChange={(e) => {
                                                               handleStoreValue(e)
                                                           }}
                                                           value={values.mass_profit}
                                                           name="hs-input-with-leading-and-trailing-icon"
                                                           className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer
                                                       py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                           placeholder="0.00"/>
                                                    <div
                                                        className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                                                        <span className="text-gray-500 dark:text-neutral-500">%</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="mass_profit_status"
                                                           checked={values.mass_profit_status}
                                                           onChange={(e) => handleStoreValue(e)}
                                                           className="relative w-[35px] h-[21px] bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                                                    before:inline-block before:size-4 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                                                    <label htmlFor="hs-xs-switch"
                                                           className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                        Aktifkan mass profit
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-1 p-6 space-y-2'>
                                        <div className='grid grid-cols-2 justify-between'>
                                            <h1 className='font-semibold dark:text-white'>Form Input {brandName}</h1>
                                            <button type="button"
                                                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                    data-hs-overlay="#hs-static-backdrop-modal-form">
                                                Tambah Form Input
                                            </button>
                                        </div>
                                        {/*<AddSelectInput label={'Test'} handleSelect={handleSelect} id={'test'}*/}
                                        {/*                options={selectOptions}/>*/}
                                        {/*<div>*/}
                                        {
                                            formInputs && formInputs.map((form) => {
                                                if (form.type === 'select') {
                                                    return (
                                                        <div className='grid grid-cols-4 gap-2'>
                                                            <div className='col-span-3'>
                                                                <AddSelectInput
                                                                    key={form.id}
                                                                    id={form.id}
                                                                    label={form.name}
                                                                    options={form.options}
                                                                    handleSelect={handleSelect}  // Ganti dengan fungsi handle yang sesuai
                                                                />
                                                            </div>
                                                            <div className="mt-7 hs-dropdown relative inline-flex">
                                                                <button id="hs-dropdown-custom-icon-trigger"
                                                                        type="button"
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
                                                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                                                                    aria-labelledby="hs-dropdown-custom-icon-trigger">
                                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                                                       href='#' data-hs-overlay='#add-option-modal'>
                                                                        Tambah Pilihan
                                                                    </a>
                                                                    <button
                                                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                                                        onClick={(e) => {
                                                                            router.post(`/admin/deleteForm/${form.id}`)
                                                                        }}>
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <AddOptionModal label={form.name} formId={form.id}/>

                                                        </div>

                                                    );
                                                } else if (form.type === 'text') {
                                                    return (
                                                        <div className='grid grid-cols-4 gap-2'>
                                                            <div className='col-span-3'>
                                                                <AddTextInput form={form}/>
                                                            </div>
                                                            <div className="mt-7 hs-dropdown relative inline-flex">
                                                                <button id={`hs-dropdown-custom-icon-trigger-${form.id}`}
                                                                        type="button"
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
                                                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                                                                    aria-labelledby={`hs-dropdown-custom-icon-trigger-${form.id}`}>
                                                                    <button
                                                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                                                        onClick={(e) => {
                                                                            router.post(`/admin/deleteForm/${form.id}`)
                                                                        }}>
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                } else if (form.type === 'number') {
                                                    return (
                                                        <div className='grid grid-cols-4 gap-2'>
                                                            <div className='col-span-3'>
                                                                <AddNumberInput form={form}/>
                                                            </div>
                                                            <div className="mt-7 hs-dropdown relative inline-flex">
                                                                <button id={`hs-dropdown-custom-icon-trigger-${form.id}`}
                                                                        type="button"
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
                                                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                                                                    aria-labelledby={`hs-dropdown-custom-icon-trigger-${form.id}`}>
                                                                    <button
                                                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                                                        onClick={(e) => {
                                                                            router.post(`/admin/deleteForm/${form.id}`)
                                                                        }}>
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null;  // Mengembalikan null jika kondisi tidak terpenuhi
                                            })
                                        }

                                    </div>
                                </div>

                                <div className='flex justify-end p-2 text-white'>
                                    <button type='submit'
                                            className='bg-blue-600 min-w-40 dark:text-white hover:bg-blue-700 w-1/5 mx-10 p-2 rounded-lg'>
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="-m-1.5 overflow-x-auto">*/}
            {/*    <div className="p-1.5 min-w-full inline-block align-middle">*/}
            {/*        <div id="hs-basic-collapse-heading"*/}
            {/*             className="hs-collapse hidden w-full overflow-y-scroll transition-[height] duration-300 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">*/}
            {/*            /!*<!-- Header >*!/*/}
            {/*            /!*<div *!/*/}
            {/*            /!*     className=""*!/*/}
            {/*            /!*     aria-labelledby="hs-basic-collapse">*!/*/}
            {/*            <div*/}
            {/*                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">*/}
            {/*                <div>*/}
            {/*                    <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-neutral-200">*/}
            {/*                        Add Product {brand.brand_name}*/}
            {/*                    </h2>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="p-6 space-y-2">*/}
            {/*                <div className="max-w-sm">*/}
            {/*                    <label htmlFor="brand_name"*/}
            {/*                           className="block text-sm font-medium mb-2 dark:text-white">Name</label>*/}
            {/*                    <input type="text" id="brand_name"*/}
            {/*                           // value={dataAddProduct.brand_name}*/}
            {/*                           // onChange={(e) => handleStoreValue(e)}*/}
            {/*                           className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
            {/*                           placeholder="Name"/>*/}
            {/*                </div>*/}
            {/*                <div className="max-w-sm">*/}
            {/*                    <label htmlFor="category_id"*/}
            {/*                           className="block text-sm font-medium mb-2 dark:text-white">Category</label>*/}
            {/*                    <select data-hs-select='{*/}
            {/*                                              "placeholder": "Select option...",*/}
            {/*                                              "toggleTag": "<button type=\"button\"></button>",*/}
            {/*                                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",*/}
            {/*                                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",*/}
            {/*                                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",*/}
            {/*                                              "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",*/}
            {/*                                              "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"*/}
            {/*                                            }' className="hidden"*/}
            {/*                            id='category_id'*/}
            {/*                            // onChange={(e) => handleStoreValue(e)}*/}
            {/*                            // value={dataAddProduct.category_id}*/}
            {/*                        // onChange={(e) => handleCategoryChange(e, brand)}*/}
            {/*                    >*/}
            {/*                        <option value="">Choose</option>*/}
            {/*                        {categories.map((category) => (*/}
            {/*                            <option key={category.category_id} value={category.category_id}>*/}
            {/*                                {category.category_name}*/}
            {/*                            </option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*                </div>*/}
            {/*                <div className="max-w-sm">*/}
            {/*                    <label htmlFor="processed_by"*/}
            {/*                           className="block text-sm font-medium mb-2 dark:text-white">Processed*/}
            {/*                        By</label>*/}
            {/*                    /!*<!-- Select *!/*/}
            {/*                    <select data-hs-select='{*/}
            {/*                                  "placeholder": "Select option...",*/}
            {/*                                  "toggleTag": "<button type=\"button\"></button>",*/}
            {/*                                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",*/}
            {/*                                  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",*/}
            {/*                                  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",*/}
            {/*                                  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",*/}
            {/*                                  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"*/}
            {/*                                }' className="hidden" id='processed_by'*/}
            {/*                            // onChange={(e) => handleStoreValue(e)}*/}
            {/*                            // value={dataAddProduct.processed_by}*/}

            {/*                    >*/}
            {/*                        <option value="">Choose</option>*/}
            {/*                        <option value='digiflazz'>Digiflazz</option>*/}
            {/*                        <option value='manual'>Manual</option>*/}
            {/*                    </select>*/}
                                {/*// <!-- End Select -->*/}
            {/*                </div>*/}
            {/*                <div className="max-w-sm">*/}
            {/*                    <label htmlFor="brand_status"*/}
            {/*                           className="block text-sm font-medium mb-2 dark:text-white">*/}
            {/*                        Status*/}
            {/*                    </label>*/}
            {/*                    /!*<!-- Select *!/*/}
            {/*                    <select id='brand_status'*/}
            {/*                            data-hs-select='{*/}
            {/*                                  "placeholder": "Select option...",*/}
            {/*                                  "toggleTag": "<button type=\"button\"></button>",*/}
            {/*                                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",*/}
            {/*                                  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",*/}
            {/*                                  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",*/}
            {/*                                  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",*/}
            {/*                                  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"*/}
            {/*                                }' className="hidden"*/}
            {/*                            // onChange={(e) => handleStoreValue(e)}*/}
            {/*                            // value={dataAddProduct.brand_status}*/}
            {/*                    >*/}
            {/*                        <option value="">Choose</option>*/}
            {/*                        <option value={1}>Active</option>*/}
            {/*                        <option value={0}>NonActive</option>*/}
            {/*                    </select>*/}
                                {/*// <!-- End Select -->*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <button type="button"*/}
            {/*                            // onClick={event => handleStore(event)}*/}
            {/*                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">*/}
            {/*                        Save*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            /!*</div>*!/*/}


            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <AddProduct brand={brand} categories={categories}
                        handleReset={handleReset} setDataStore={setDataStore}
                        dataStore={dataStore}/>
            <div className="flex flex-col">
                <div
                    className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                    {/*<div>*/}
                    {brand && (
                        <div key={brand.brand_id}>
                            <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-neutral-200">{brand.brand_name}</h2>
                            {/*{brand.products && brand.products.map((product) => (*/}
                            {/*    <p key={product.product_id}>{product.product_name}</p>*/}
                            {/*))}*/}
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                Add {brand.brand_name} products, edit and more.
                            </p>
                        </div>
                    )}

                    {/*</div>*/}

                    <div>
                        <div className="inline-flex gap-x-2">
                            <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                               href="#" onClick={handleSync}>
                                Sync with Digiflazz
                            </a>

                            <button type="button"
                                    onClick={handleReset}
                                    disabled={brand.processed_by === 'digiflazz'}
                                    className="hs-collapse-toggle hs-collapse-open:bg-red-700 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    id="hs-basic-collapse" data-hs-collapse="#hs-basic-collapse-heading">
                                <div className="hs-collapse-open:hidden flex">
                                    Add Product
                                </div>
                                <div className="hs-collapse-open:block hidden flex">
                                    Close
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
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
                                            Product Code
                                          </span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Price
                                          </span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Selling Price
                                          </span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Profit
                                          </span>
                                        </div>
                                    </th>
                                    {
                                        brand.processed_by === 'digiflazz' && (
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Seller
                                          </span>
                                                </div>
                                            </th>
                                        )
                                    }
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
                                        <div className="flex items-center justify-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Action
                                          </span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {products && products.data.map((product, index) => (
                                    <tr key={product.id}>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="max-w-sm space-y-3">
                                                        <input type="text"
                                                               value={productNames[product.id] || ''}
                                                               onChange={(e) => handleInputNameChange(e, product.id)}
                                                               className="py-3 px-4 block w-min-60 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                               placeholder="This is placeholder"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.buyer_sku_code}</span>
                                            </div>
                                        </td>
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formatRupiah(product.price)}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="max-w-sm space-y-3">
                                                        <input type="text"
                                                               value={productSellingPrices[product.id] || ''}
                                                               onChange={(e) => handleInputSellingPriceChange(e, product.id)}
                                                               className="py-3 px-4 block w-min-60 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                               placeholder="Masukkan harga jual"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formatRupiah(product.selling_price - product.price)}</span>
                                            </div>
                                        </td>
                                        {
                                            brand.processed_by === 'digiflazz' && (
                                                <td className="h-px w-72 whitespace-nowrap">
                                                    <div className="px-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.seller_name}</span>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className={`py-1 px-1.5 inline-flex rounded-full items-center gap-x-1 text-xs font-medium ${product.product_status ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500' : 'bg-gray-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'}`}>
                                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg"
                                                         width="16" height="16" fill="currentColor"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                    {product.product_status ? 'Active' : 'Nonactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="text-sm text-gray-500 dark:text-neutral-500">{new Date(product.updated_at).toLocaleDateString('en-US', {
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
                                                    <input type="checkbox" checked={product.product_status}
                                                           onChange={(e) => {
                                                               handleCheckboxProductChange(e, product)
                                                           }}
                                                           id="hs-small-switch"
                                                           className="relative w-[35px] h-[21px] bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                                                           before:inline-block before:size-4 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                                                    {/*<label htmlFor="hs-tooltip-example"*/}
                                                    {/*       className="text-sm text-gray-500 ms-3 dark:text-neutral-400">*/}
                                                    {/*    {category.category_status === true ? "Brand Active" : "Brand Nonactive"}*/}
                                                    {/*</label>*/}
                                                    <div
                                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                                        role="tooltip">
                                                        {product.product_status === true ? "Nonactive Brand" : "Activated Brand"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button"
                                                            onClick={(e) => {
                                                                handleSave(e, product)
                                                            }}
                                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
                                                        Save
                                                    </button>
                                                </div>
                                                <div>
                                                    <button type="button"
                                                        onClick={(e) => {
                                                            handleDelete(product.id)
                                                        }}
                                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        {/*<EditProductModal product={product}/>*/}

                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            {/*{selectedProduct && (*/}
                            {/*    <EditProductModal product={selectedProduct}/>*/}
                            {/*// )}*/}
                        </div>
                    </div>
                </div>
                {/*<!-- Footer */}
                <div
                    className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                        <span
                                                            className="font-semibold text-gray-800 dark:text-neutral-200">{products.total}</span> results
                        </p>

                    </div>

                    <div>
                        <div className="inline-flex gap-x-2">
                            {/*{products.links}*/}
                            <a
                                type="button"
                                href={products.prev_page_url ? products.prev_page_url : "#"}
                                className={`py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 ${!products.prev_page_url && 'disabled:opacity-50 disabled:pointer-events-none'}`}
                                disabled={products.prev_page_url != null}
                            >
                                <svg className="flex-shrink-0 size-4"
                                     xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="m15 18-6-6 6-6"/>
                                </svg>
                                Prev
                            </a>
                            <div
                                className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            >
                                {products.current_page}
                            </div>

                            <a type="button"
                               href={products.next_page_url ? products.next_page_url : "#"}
                               className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                               disabled={products.prev_page_url != null}
                            >
                                Next
                                <svg className="flex-shrink-0 size-4"
                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/*<!-- End Footer */}
            </div>
        </AuthenticatedAdmin>
    )
}
