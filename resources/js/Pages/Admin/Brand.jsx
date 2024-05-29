import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import Alert from "@/Components/Alert.jsx";
import AddCategoryModal from "@/Components/AddCategoryModal.jsx";
import React, {useState} from "react";
import {router, usePage} from "@inertiajs/react";

export default function Brand(){
    const {flash, brands} = usePage().props
    const [alertVisible, setAlertVisible] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    return (
        <AuthenticatedAdmin>
            {flash && flash.message && alertVisible && (
                <Alert onDismiss={handleDismiss}>
                    {flash.message}
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

                                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
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
                                {brands && brands.map((brand,index) => (
                                    <tr key={brand.brand_id}>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 py-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{index+1}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{brand.brand_name}
                                                </span>
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
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span
                                                    className={`py-1 px-1.5 inline-flex rounded-full items-center gap-x-1 text-xs font-medium ${brand.brand_status ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500' : 'bg-gray-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'}`}>
                                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                    {brand.brand_status ? 'Active' : 'Nonactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="text-sm text-gray-500 dark:text-neutral-500">{brand.updated_at}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-1.5">
                                                <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                                                   href={route('admin.brand.show',brand.brand_id)}>
                                                    Edit
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
