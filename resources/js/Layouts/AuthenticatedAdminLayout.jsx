import NavbarAdmin from "@/Components/NavbarAdmin.jsx";
import SidebarAdmin from "@/Components/SidebarAdmin.jsx";
import {Head, usePage} from "@inertiajs/react";
import React from "react";
import Breadcrumb from "@/Components/BreadCrumb.jsx";
import DigiflazzConfigurationAlert from "@/Components/DigiflazzConfigurationAlert.jsx";
import PaymentGatewayConfigurationAlert from "@/Components/PaymentGatewayConfigurationAlert.jsx";

export default function AuthenticatedAdmin({auth, user, digi_auths,fonntes,tripays, children}) {
    return (
        <div className="min-h-screen sm:justify-center pt-6 sm:pt-0 bg-primary-100 dark:bg-neutral-900 text-neutral-800 dark:text-white">
            <Head title="Admin Dashboard"/>

            <NavbarAdmin user={user}/>
            {/*<!-- ========== MAIN CONTENT ========== */}
            {/*<!-- Breadcrumb */}
            <div
                className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex justify-between items-center py-2">
                    {/*<!-- Sidebar */}
                    <button type="button"
                            className="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-primary-200 text-primary-500 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
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
                        {
                            digi_auths === null && (
                                <DigiflazzConfigurationAlert/>
                            )
                        }
                        {
                            fonntes === null && (
                                <PaymentGatewayConfigurationAlert/>
                            )
                        }
                        {
                            tripays === null && (
                                <PaymentGatewayConfigurationAlert/>
                            )
                        }
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

