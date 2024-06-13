import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React, {useEffect, useState} from "react";
import {router, usePage} from "@inertiajs/react";
import Alert from "@/Components/Alert.jsx";
import AddCategoryModal from "@/Components/AddCategoryModal.jsx";
import SuccessAlert from "@/Components/SuccessAlert.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";

export default function Category() {
    const {flash, categories, totalBrands} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isAlert, setIsAlert] = useState(true)
    const [categoryNames,setCategoryNames] = useState({})
    const [keyword, setKeyword] = useState('');

    // (transactionsPaginate)

    const filteredCategories = categories && keyword.length > 0 ? categories.filter(category => {
        // Memastikan setiap nilai yang akan diakses tidak null
        return (
            category.category_name
        ) && (
            // Cek jika ada kata kunci pencarian dan transaksi tidak null
            category.category_name.toLowerCase().includes(keyword.toLowerCase())
        );
    }) : [];

    useEffect(() => {
        // Inisialisasi state dengan nama kategori dari props
        const initialCategoryNames = {};
        categories.forEach(category => {
            initialCategoryNames[category.category_id] = category.category_name;
        });
        setCategoryNames(initialCategoryNames);
    }, [categories]);

    function handleSync(e) {
        e.preventDefault()
        router.post('/admin/digiflazz/fetch')
    }
    function handleDismiss() {
        setAlertVisible(false);
    }

    // Function to open the modal
    function openAddModal() {
        setIsAddModalOpen(true);
    }

    // Function to close the modal
    function closeAddModal() {
        setIsAddModalOpen(false);
    }

    const handleInputChange = (e, categoryId) => {
        setCategoryNames({
            ...categoryNames,
            [categoryId]: e.target.value,
        });
    };

    function handleCheckboxChange(event,category) {
        event.preventDefault()
        setIsAlert(true)
        setIsCheckboxChecked(event.target.checked);
        router.post(`/categories/${category.category_id}`,{
            category_name: category.category_name,
            category_status: event.target.checked
        })
    }
    function handleDelete(e,category) {
        e.preventDefault()
        router.post(`/categories/delete/${category.category_id}`)
    }
    function handleSave(e,category,categoryName) {
        e.preventDefault()
        router.post(`/categories/${category.category_id}`,{
            category_name: categoryName,
            category_status: category.category_status
        })
    }

    function renderCategoryRow(category, index) {
        return (<tr key={category.category_id}>
            <td className="size-px whitespace-nowrap">
                <div className="ps-6 py-3">
                    <div className="flex items-center gap-x-3">
                        <span
                            className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{index + 1}
                        </span>
                    </div>
                </div>
            </td>
            <td className="size-px w-auto whitespace-nowrap">
                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                    <div className="flex items-center gap-x-3">
                        {/*<span*/}
                        {/*    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{category.category_name}*/}
                        {/*</span>*/}
                        <div className="max-w-sm space-y-3">
                            <input type="text"
                                   value={categoryNames[category.category_id] || ''}
                                   onChange={(e) => handleInputChange(e, category.category_id)}
                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   placeholder="This is placeholder"/>
                        </div>
                    </div>
                </div>
            </td>
            <td className="h-px w-72 whitespace-nowrap">
                <div className="px-6 py-3">
                    <span
                        className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{category.brands_count}</span>
                    {/*    <span*/}
                    {/*        className="block text-sm text-gray-500 dark:text-neutral-500">{user.role}</span>*/}
                </div>
            </td>
            <td className="size-px whitespace-nowrap">
                <div className="px-6 py-3">
                    {
                        category.category_status === 1 && (
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
                        category.category_status === 0 && (
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
                        className="text-sm text-gray-500 dark:text-neutral-500">{new Date(category.updated_at).toLocaleDateString('en-US', {
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
                        <input type="checkbox" checked={category.category_status}
                               onChange={(e) => {
                                   handleCheckboxChange(e, category)
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
                            {category.category_status === true ? "Nonactive Brand" : "Activated Brand"}
                        </div>
                    </div>
                    <div>
                        <button type="button"
                                onClick={(e) => {
                                    handleSave(e, category, categoryNames[category.category_id])
                                }}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
                            Save
                        </button>
                    </div>
                    <div>
                        <button type="button"
                                onClick={(e) => {
                                    handleDelete(e, category)
                                }}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400">
                            Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>)
    }

    const CategoriesTable = () => {
        const hasFilteredTransactions = keyword.length > 0 && filteredCategories.length > 0;

        return (
            <>
                {hasFilteredTransactions ? (
                    filteredCategories.map((category, index) => (
                        renderCategoryRow(category, index)
                    ))
                ) : (
                    categories.map((category, index) => (
                        renderCategoryRow(category, index)
                    ))
                )}
            </>
        );
    };

    // (flash)
    return (
        <AuthenticatedAdmin>
            {
                flash && flash.message && (
                    <SuccessAlert setIsOpen={setIsAlert} isOpen={isAlert} message={flash.message}/>
                )
            }
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
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Categories
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                                        Add categories, edit and more.
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

                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                           href="#" onClick={openAddModal}>
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
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
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
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
                                            Total Brand
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
                                    {/*<th scope="col" className="px-6 py-3 text-start">*/}

                                    {/*</th>*/}


                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Updated
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center gap-x-2 mx-auto">
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
                                    CategoriesTable()
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
