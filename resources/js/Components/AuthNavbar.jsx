import {Link, router} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";
import {useState} from "react";

export default function AuthNavbar({user, auth}) {
    const [activePage, setActivePage] = useState('');
    return (
        // ========== HEADER =========
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 py-7 max-sm:py-1 w-full">
            <nav
                className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6  mx-auto"
                aria-label="Global">
                <div className="md:col-span-3">
                    {/*// <!-- Logo -->*/}
                    <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                       href="/" aria-label="Preline">
                        <img className='hidden dark:flex w-40 max-sm:w-20' src="/storage/logo_dark.png" alt="logo"/>
                        <img className='flex dark:hidden w-40 max-sm:w-20' src="/storage/logo_light.png" alt="logo"/>
                    </a>
                    {/*// <!-- End Logo */}
                </div>

                {/*// <!-- Button Group */}

                <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <div className="flex flex-row items-center justify-end gap-2">

                                <div className="hs-dropdown relative border-blue-400 border-2 rounded-full inline-flex">
                                    <button id="hs-dropdown-with-header" type="button"
                                            className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700">
                                        <span className="inline-block size-full bg-gray-100 rounded-full overflow-hidden">
                                            <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
                                                <path
                                                    d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 absolute z-50">
                                        <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-800">
                                            <p className="text-sm text-gray-500 dark:text-neutral-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">{user?.email}</p>
                                        </div>
                                        <div className="mt-2 py-2 first:pt-0 last:pb-0">
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*    <button*/}
                    {/*        type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-primary-200 text-black hover:bg-primary-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white" data-hs-overlay="#hs-modal-signin">*/}
                    {/*        /!*<Link*!/*/}
                    {/*        /!*    href={route('login')}*!/*/}
                    {/*        /!*    className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*!/*/}
                    {/*        /!*>*!/*/}
                    {/*            Sign in*/}
                    {/*        /!*</Link>*!/*/}
                    {/*    </button>*/}
                    {/*    <button onSubmit={route('register')}*/}
                    {/*        type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-secondary-400 text-black hover:bg-secondary-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-secondary-500">*/}
                    {/*        Sign up*/}
                    {/*    </button>*/}

                    <div className="flex gap-2 md:hidden">
                        <div className="hs-dropdown relative border-blue-400 border-2 rounded-full inline-flex">
                            <button id="hs-dropdown-with-header" type="button"
                                    className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700">
                                        <span
                                            className="inline-block size-full bg-gray-100 rounded-full overflow-hidden">
                                            <svg className="size-full text-gray-300" width="16" height="16"
                                                 viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5"
                                                      fill="white"></rect>
                                                <path
                                                    d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                            </button>

                            <div
                                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 absolute z-50">
                                <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-800">
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">{user?.email}</p>
                                </div>
                                <div className="mt-2 py-2 first:pt-0 last:pb-0">
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </div>
                            </div>
                        </div>
                        <button type="button"
                                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-primary-200 text-black hover:bg-primary-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                                data-hs-collapse="#navbar-collapse-with-animation"
                                aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                            <svg className="hs-collapse-open:hidden flex-shrink-0 size-4"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <line x1="3" x2="21" y1="6" y2="6"/>
                                <line x1="3" x2="21" y1="12" y2="12"/>
                                <line x1="3" x2="21" y1="18" y2="18"/>
                            </svg>
                            <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                {/*<!-- End Button Group */}

                {/*<!-- Collapse */}
                <div
                    id="navbar-collapse-with-animation"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
                >
                    <div
                        className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                        {/* Navigation Links */}
                        <div>
                            <Link
                                className={`relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 ${
                                    activePage === 'dashboard' ? 'before:bg-secondary-400 underline' : ''
                                } dark:text-white`}
                                href='/'
                                aria-current={activePage === 'dashboard' ? 'page' : undefined}
                                onClick={() => setActivePage('dashboard')}
                            >
                                Beranda
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`inline-block text-black hover:text-primary-600 dark:text-white dark:hover:text-neutral-300 ${
                                    activePage === 'order-history' ? 'text-secondary-400' : ''
                                }`}
                                href="/transactions/history"
                                onClick={() => setActivePage('order-history')}
                            >
                                Riwayat Pesanan
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`inline-block text-black hover:text-primary-600 dark:text-white dark:hover:text-neutral-300 ${
                                    activePage === 'about' ? 'text-secondary-400' : ''
                                }`}
                                href="#"
                                onClick={() => setActivePage('about')}
                            >
                                Tentang
                            </Link>
                        </div>
                    </div>
                </div>
                {/*// <!-- End Collapse -->*/}
            </nav>
        </header>
        // <!-- ========== END HEADER ==========
    )
}
