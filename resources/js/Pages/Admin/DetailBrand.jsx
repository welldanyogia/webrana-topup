import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import Alert from "@/Components/Alert.jsx";
import AddCategoryModal from "@/Components/AddCategoryModal.jsx";
import React, {useState, useRef, useEffect} from "react";
import {router, usePage} from "@inertiajs/react";
import '../../../css/app.css'
import AddSelectInput from "@/Components/AddSelectInput.jsx";
import AddFormInputModal from "@/Components/AddFormInputModal.jsx";
import AddOptionModal from "@/Components/AddOptionModal.jsx";
import AddTextInput from "@/Components/AddTextInput.jsx";
import EditProductModal from "@/Components/EditProductModal.jsx";
import AddNumberInput from "@/Components/AddNumberInput.jsx";

export default function DetailBrand() {
    const {flash, brand, products, formInputs} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(brand && brand[0]?.brand_status === 1);
    const [brandName, setBrandName] = useState(brand && brand[0]?.brand_name);
    const brandId = brand[0]?.brand_id
    const [alertMessage, setAlertMessage] = useState('');
    const [brandImage, setBrandImage] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const [selectValue, setSelectValue] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const rteRef = useRef<RichTextEditorRef>null;


    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    // useEffect(() => {
    //     const inputElement = document.getElementById('input-label');
    //     if (inputElement) {
    //         const handleInput = (e) => {
    //             e.target.value = e.target.value.replace(/[^0-9]/g, '');
    //         };
    //         inputElement.addEventListener('input', handleInput);
    //
    //         return () => {
    //             inputElement.removeEventListener('input', handleInput);
    //         };
    //     }
    // }, []);

    const selectOptions = [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'},
        {label: 'Option 3', value: '3'},
        {label: 'Option 4', value: '4'},
    ];

    // console.log(formInputs)
    // console.log(optionsInput)

    // console.log(brand[0].brand_id)

    function handleBrandImageChange(e) {
        setBrandImage(e.target.files[0]);
    }

    async function handleCheckboxChange(event) {
        event.preventDefault()
        setIsCheckboxChecked(event.target.checked);
        try {
            const response = await axios.post(`/api/brands/${brandId}`,
                {
                    brand_name : brandName,
                    brand_status: event.target.checked
                });

            console.log('Response:', response.data);
            setAlertMessage('Brand successfully saved.');
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage(`${error}`);
            // Handle error, e.g., show error message to user
        }
    }

    function handleTestButton() {
        console.log('test button : ' + editorContent)
    }

    const handleSelect = (event) => {
        setSelectValue(event.target.value);
    };

    function handleEditorChange(content) {
        setEditorContent(content);
        console.log(content)
    }

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

    // Function to open the modal
    function openAddFormModal() {
        setIsAddFormModalOpen(true);
        console.log('modal form : ' + isAddFormModalOpen)
    }

    // Function to close the modal
    function closeAddFormModal() {
        setIsAddFormModalOpen(false);
    }

    function openAddModal() {
        setIsAddModalOpen(true)
        console.log('category : ' + isAddModalOpen)
    }

    // Function to close the modal
    function closeAddModal() {
        setIsAddModalOpen(false);
        console.log(isAddModalOpen)
    }

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        function status(){
            if (isCheckboxChecked){
                return 1
            }else {
                return 0
            }
        }
        console.log('ststu :' +status(isCheckboxChecked))


        const formData = new FormData();
        formData.append('brand_name', brandName);
        formData.append('brand_image', brandImage);
        formData.append('brand_status', status(isCheckboxChecked));

        try {
            const response = await axios.post(`/api/brands/${brandId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);
            setAlertMessage('Brand successfully saved.');
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage(`${error}`);
            // Handle error, e.g., show error message to user
        }
    }

    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello <b>world</b>!</p>",
    });

    return (
        <AuthenticatedAdmin>
            {flash && flash.message && alertVisible && (
                <Alert onDismiss={handleDismiss}>
                    {flash.message}
                </Alert>
            )}
            {alertMessage && (
                <Alert onDismiss={handleDismiss}>
                    {alertMessage}
                </Alert>
            )}
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                {/*<div>*/}
                                {brand && brand.map((brand) => (
                                    <div key={brand.brand_id}>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">{brand.brand_name}</h2>
                                    </div>
                                ))}

                                {/*</div>*/}

                                <div>
                                    <div className="inline-flex gap-x-2">

                                        <div className="hs-tooltip flex items-center">
                                            <input type="checkbox" checked={isCheckboxChecked}
                                                   onChange={handleCheckboxChange} id="hs-tooltip-example" className="hs-tooltip-toggle relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                                            before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"/>
                                            <label htmlFor="hs-tooltip-example"
                                                   className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                {isCheckboxChecked === true ? "Brand Active" : "Brand Nonactive"}
                                            </label>
                                            <div
                                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                                role="tooltip">
                                                {isCheckboxChecked === true ? "Nonactive Brand" : "Activated Brand"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <AddCategoryModal isOpen={isAddModalOpen} onClose={closeAddModal}/>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-2'>
                                    <div className='col-span-1 p-6 space-y-6'>
                                        <div className="max-w-sm">
                                            <label htmlFor="input-brand-name"
                                                   className="block text-sm font-medium mb-2 dark:text-white">Brand
                                                Name</label>
                                            <input type="text" id="input-brand-name"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   placeholder="Brand Name"
                                                   defaultValue={brandName}
                                                   onChange={handleBrandNameChange} //
                                            />
                                        </div>
                                        <div className="max-w-sm">
                                            <label htmlFor="input-brand-image"
                                                   className="block text-sm font-medium mb-2 dark:text-white">Brand
                                                Image</label>
                                            <input type="file" id='input-brand-image'
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

                                                } else if (form.type === 'number'){
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
                                        {/*</div>*/}
                                        <AddFormInputModal brand={brandName} brandId={brandId}/>

                                    </div>
                                </div>
                                <div className='flex justify-end p-2 text-white'>
                                    <button type='submit'
                                            className='bg-blue-600 dark:text-white hover:bg-blue-700 w-1/5 mx-10 p-2 rounded-lg'>Save
                                        changes
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/*{brand && brand.map((brand) => (*/}
            {/*    <div key={brand.brand_id}>*/}
            {/*        <h1>{brand.brand_name}</h1>*/}
            {/*        {brand.products && brand.products.map((product) => (*/}
            {/*            <p key={product.product_id}>{product.product_name}</p>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*))}*/}
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                {/*<div>*/}
                                {brand && brand.map((brand) => (
                                    <div key={brand.brand_id}>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">{brand.brand_name}</h2>
                                        {/*{brand.products && brand.products.map((product) => (*/}
                                        {/*    <p key={product.product_id}>{product.product_name}</p>*/}
                                        {/*))}*/}
                                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                                            Add {brand.brand_name} products, edit and more.
                                        </p>
                                    </div>
                                ))}

                                {/*</div>*/}

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                           href="#" onClick={handleSync}>
                                            Sync with Digiflazz
                                        </a>

                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                           href="#" onClick={openAddModal}>
                                            <svg className="flex-shrink-0 size-4"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M5 12h14"/>
                                                <path d="M12 5v14"/>
                                            </svg>
                                            Add category
                                        </a>
                                    </div>
                                </div>
                                <AddCategoryModal isOpen={isAddModalOpen} onClose={closeAddModal}/>
                            </div>
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
                                    <th scope="col"
                                        className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
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

                                    <th scope="col" className="px-6 py-3 text-end"></th>
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
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.product_name}
                                                </span>
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
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.selling_price ? formatRupiah(product.selling_price) : formatRupiah(product.price)}</span>
                                            </div>
                                        </td>
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
                                                className="text-sm text-gray-500 dark:text-neutral-500">{new Date(product.updated_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-1.5">
                                                <button
                                                    className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                                                    type="button"
                                                    onClick={() => {
                                                        handleEditClick(product)
                                                        console.log(selectedProduct)
                                                    }}
                                                    data-hs-overlay={`#hs-static-backdrop-modal-edit-product-${product.id}`}>
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                        <EditProductModal product={product}/>

                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            {/*{selectedProduct && (*/}
                            {/*    <EditProductModal product={selectedProduct}/>*/}
                            {/*// )}*/}
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
                    </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
