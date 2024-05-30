import {Link} from "@inertiajs/react";
import SigninModal from "@/Components/SigninModal.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import {useState} from "react";

export default function AuthNavbar({user}) {
    const [activePage, setActivePage] = useState('');
    return(
        // ========== HEADER =========
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <nav
                className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6  mx-auto"
                aria-label="Global">
                <div className="md:col-span-3">
                    {/*// <!-- Logo -->*/}
                    <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                       href="#" aria-label="Preline">
                        <img src='/logo_dark.png' width={145} alt={`logo}`}/>


                    </a>
                    {/*// <!-- End Logo */}
                </div>

                {/*// <!-- Button Group */}

                <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    {/*    <button*/}
                    {/*        type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white" data-hs-overlay="#hs-modal-signin">*/}
                    {/*        /!*<Link*!/*/}
                    {/*        /!*    href={route('login')}*!/*/}
                    {/*        /!*    className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*!/*/}
                    {/*        /!*>*!/*/}
                    {/*            Sign in*/}
                    {/*        /!*</Link>*!/*/}
                    {/*    </button>*/}
                    {/*    <button onSubmit={route('register')}*/}
                    {/*        type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">*/}
                    {/*        Sign up*/}
                    {/*    </button>*/}

                        <div className="md:hidden">
                            <button type="button" className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                                <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                </div>
                {/*<!-- End Button Group */}

                {/*<!-- Collapse */}
                <div
                    id="navbar-collapse-with-animation"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
                >
                    <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                        {/* Navigation Links */}
                        <div>
                            <Link
                                className={`relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 ${
                                    activePage === 'dashboard' ? 'before:bg-lime-400 underline' : ''
                                } dark:text-white`}
                                href='/dashboard'
                                aria-current={activePage === 'dashboard' ? 'page' : undefined}
                                onClick={() => setActivePage('dashboard')}
                            >
                                Beranda
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300 ${
                                    activePage === 'order-history' ? 'text-lime-400' : ''
                                }`}
                                href="#"
                                onClick={() => setActivePage('order-history')}
                            >
                                Riwayat Pesanan
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300 ${
                                    activePage === 'about' ? 'text-lime-400' : ''
                                }`}
                                href="#"
                                onClick={() => setActivePage('about')}
                            >
                                Tentang
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300 ${
                                    activePage === 'blog' ? 'text-lime-400' : ''
                                }`}
                                href="#"
                                onClick={() => setActivePage('blog')}
                            >
                                Blog
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
