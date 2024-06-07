import Dropdown from "@/Components/Dropdown.jsx";

export default function NavbarAdmin({user}){
    return (
        <>
            <header
                className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-neutral-800 dark:border-neutral-700">
                <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6" aria-label="Global">
                    <div className="me-5 lg:me-0 lg:hidden">
                        {/*<!-- Logo */}
                        <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                           href="/admin" aria-label="Logo">
                            <img className='hidden dark:flex w-40' src="/storage/logo_dark.png" alt="logo"/>
                            <img className='flex dark:hidden w-40' src="/storage/logo_light.png" alt="logo"/>
                        </a>
                        {/*<!-- End Logo */}
                    </div>

                    <div
                        className="w-full flex-reverse items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
                        <div className="sm:hidden">
                            {/*<button type="button"*/}
                            {/*        className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-primary-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700">*/}
                            {/*    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"*/}
                            {/*         height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"*/}
                            {/*         strokeLinecap="round" strokeLinejoin="round">*/}
                            {/*        <circle cx="11" cy="11" r="8"/>*/}
                            {/*        <path d="m21 21-4.3-4.3"/>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>



                        <div className="flex flex-row items-center justify-end gap-2">
                            {/*<button type="button"*/}
                            {/*        className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700">*/}
                            {/*    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"*/}
                            {/*         height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"*/}
                            {/*         strokeLinecap="round" strokeLinejoin="round">*/}
                            {/*        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>*/}
                            {/*        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                            {/*<button type="button"*/}
                            {/*        className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"*/}
                            {/*        data-hs-offcanvas="#hs-offcanvas-right">*/}
                            {/*    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"*/}
                            {/*         height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"*/}
                            {/*         strokeLinecap="round" strokeLinejoin="round">*/}
                            {/*        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}

                            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                                <button id="hs-dropdown-with-header" type="button"
                                        className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700">
                                    <img
                                        className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-800"
                                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                        alt="Image Description"/>
                                </button>

                                <div
                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700"
                                    aria-labelledby="hs-dropdown-with-header">
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
                </nav>
            </header>
        </>
    )
}
