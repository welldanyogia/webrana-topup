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

                        </div>



                        <div className="flex flex-row items-center justify-end gap-2">

                            <div className="hs-dropdown [--placement:bottom-right] relative border-blue-400 border-2 rounded-full inline-flex">
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
