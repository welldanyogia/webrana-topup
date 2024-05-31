import React from 'react';

function Footer() {
    console.log(import.meta.env.VITE_APP_NAME);
    return (
        <footer className="mt-20 w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
                <div className="col-span-full hidden lg:col-span-1 lg:block">
                    <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">
                        {import.meta.env.VITE_APP_NAME}
                    </a>
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                        © 2022 {import.meta.env.VITE_APP_NAME}.
                    </p>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Product</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        {['Pricing', 'Changelog', 'Docs', 'Download'].map((item, index) => (
                            <p key={index}>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="#">
                                    {item}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Company</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        {['About us', 'Blog', 'Careers', 'Customers', 'Newsroom', 'Sitemap'].map((item, index) => (
                            <p key={index}>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="#">
                                    {item}
                                </a>
                                {item === 'Careers' && (
                                    <span className="inline text-blue-600 dark:text-blue-500">— We're hiring</span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Resources</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        {['Community', 'Help & Support', 'eBook', 'What\'s New', 'Status'].map((item, index) => (
                            <p key={index}>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="#">
                                    {item}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Developers</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        {['Api', 'Status', 'GitHub'].map((item, index) => (
                            <p key={index}>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="#">
                                    {item}
                                </a>
                                {item === 'GitHub' && (
                                    <span className="inline text-blue-600 dark:text-blue-500">— New</span>
                                )}
                            </p>
                        ))}
                    </div>

                    <h4 className="mt-7 text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Industries</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        {['Financial Services', 'Education'].map((item, index) => (
                            <p key={index}>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="#">
                                    {item}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-5 mt-5 border-t border-gray-200 dark:border-neutral-700">
                <div className="sm:flex sm:justify-between sm:items-center">
                    <div className="flex items-center gap-x-3">
                        <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                            <button
                                id="footer-language-dropdown"
                                type="button"
                                className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            >
                                <img className="size-3 rounded-full" src="path-to-us-flag-svg" alt="US Flag" />
                                English (US)
                                <svg
                                    className="hs-dropdown-open:rotate-180 flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m18 15-6-6-6 6" />
                                </svg>
                            </button>

                            <div className="hs-dropdown-menu w-40 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" aria-labelledby="footer-language-dropdown">
                                <a className="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                                    <img className="size-3.5 rounded-full" src="path-to-us-flag-svg" alt="US Flag" />
                                    English (US)
                                </a>
                                {/* Add other languages similarly */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
