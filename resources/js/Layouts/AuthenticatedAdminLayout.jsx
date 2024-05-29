import NavbarAdmin from "@/Components/NavbarAdmin.jsx";
import SidebarAdmin from "@/Components/SidebarAdmin.jsx";
import {Head, usePage} from "@inertiajs/react";
import React from "react";
import Breadcrumb from "@/Components/BreadCrumb.jsx";

export default function AuthenticatedAdmin({auth, user, header, children}) {
    return (
        <div className="min-h-screen sm:justify-center pt-6 sm:pt-0 bg-gray-100 dark:bg-neutral-900">
            <Head title="Admin Dashboard"/>

            <NavbarAdmin user={user}/>
            {/*<!-- ========== MAIN CONTENT ========== */}
            {/*<!-- Breadcrumb */}
            <div
                className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex justify-between items-center py-2">
                    {/*<!-- Breadcrumb */}
                    {/*<ol className="ms-3 flex items-center whitespace-nowrap">*/}
                    {/*    <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">*/}
                    {/*        Application Layout*/}
                    {/*        <svg*/}
                    {/*            className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"*/}
                    {/*            width="16" height="16" viewBox="0 0 16 16" fill="none"*/}
                    {/*            xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"*/}
                    {/*                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>*/}
                    {/*        </svg>*/}
                    {/*    </li>*/}
                    {/*    <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"*/}
                    {/*        aria-current="page">*/}
                    {/*        Dashboard*/}
                    {/*    </li>*/}
                    {/*</ol>*/}
                    {/*<Breadcrumb items={breadcrumbItems}/>*/}
                    {/*<!-- End Breadcrumb */}

                    {/*<!-- Sidebar */}
                    <button type="button"
                            className="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            data-hs-overlay="#application-sidebar" aria-controls="application-sidebar"
                            aria-label="Sidebar">
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13"/>
                        </svg>
                        <span className="sr-only">Sidebar</span>
                    </button>
                    {/*<!-- End Sidebar */}
                </div>
            </div>
            {/*<!-- End Breadcrumb */}
            <SidebarAdmin/>
            <main>
                <div className="w-full lg:ps-64">
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

