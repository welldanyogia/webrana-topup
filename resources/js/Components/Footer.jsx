import React from "react"
import {usePage} from "@inertiajs/react";

function Footer() {
    const {tripayPaymentChannel} = usePage().props
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        // <!-- ========== FOOTER ========== -->
        <footer className="mt-20 w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white">
            {/*<!-- Grid */}
            <div className="grid grid-rows-3 grid-flow-col gap-4 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-5 mb-10 overflow-hidden">
                {/*<div className="col-span-full hidden lg:col-span-1 lg:block py-6">*/}
                {/*    <img className='hidden dark:flex w-1/2 mx-auto' src="/storage/logo_dark.png" alt="logo"/>*/}
                {/*    <img className='flex dark:hidden w-1/2 mx-auto' src="/storage/logo_light.png" alt="logo"/>*/}
                <div className="row-span-3 hidden lg:col-span-1 lg:block">
                    <img className='hidden dark:flex w-48 mx-auto' src="/storage/logo_dark.png" alt="logo"/>
                    <img className='flex dark:hidden w-56 mx-auto' src="/storage/logo_light.png" alt="logo"/>
                    <p className="mt-3 text-sm font-sans text-primary-900 dark:text-neutral-100">{appName} adalah
                        platform digital yang menyediakan berbagai produk digital seperti game,
                        pulsa, paket data, dan e-money. Kami menawarkan layanan cepat, mudah, dan aman untuk memenuhi
                        kebutuhan digital Anda.</p>
                    <p className="mt-3 text-xs sm:text-sm text-primary-600 dark:text-neutral-400">© 2024 {appName}.</p>
                </div>
                {/*<!-- End Col --*/}

                <div className='col-span-1 row-span-2 '>
                    <h4 className="text-xs font-semibold text-primary-900 uppercase dark:text-neutral-100">Peta
                        Situs</h4>

                    <div className="mt-3 grid space-y-3 text-sm">
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="/">Beranda</a></p>
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="/transactions/history">Riwayat Transaksi</a></p>
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="#">Tentang</a></p>
                    </div>
                </div>
                {/*<!-- End Col */}
                <div
                    className='col-span-2 max-md:col-span-full max-sm:col-span-full'>
                    <h4 className="text-xs font-semibold text-primary-900 uppercase dark:text-neutral-100">
                        Metode Pembayaran
                    </h4>

                    <div className="mt-3 flex space-y-3 text-sm">
                        <div className="w-full inline-flex flex-nowrap overflow-hidden">
                            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                                {tripayPaymentChannel.map((channel, index) => (
                                    <li key={index}>
                                        <img width={100} src={channel.icon_url} alt={channel.name}/>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                                aria-hidden={true}>
                                {tripayPaymentChannel && tripayPaymentChannel.map((channel, index) => (
                                    <li key={index}>
                                        <img width={100} src={channel.icon_url} alt={channel.name}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>


                <div className='row-span-2 col-span-1 '>
                    <h4 className="text-xs font-semibold text-primary-900 uppercase dark:text-neutral-100">
                        Dukungan
                    </h4>

                    <div className="mt-3 grid space-y-3 text-sm">
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="https://instagram.com/webrana.store/" target="_blank" 
                rel="noopener noreferrer">Instagram</a></p>
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="https://wa.me/message/R3UJIIT5GX4QB1" target="_blank" 
                rel="noopener noreferrer">Whatsapp</a></p>
                        <p><a
                            className="inline-flex gap-x-2 text-primary-600 hover:text-primary-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                            href="https://x.com/Webranas" target="_blank" 
                rel="noopener noreferrer">Twitter/X</a></p>
                    </div>
                </div>

                {/*<!-- End Col */}
            </div>
            {/*<!-- End Grid */}

            <div className="pt-5 mt-5 border-t border-gray-200 dark:border-neutral-700">
                <div className="sm:flex sm:justify-between sm:items-center">
                    <div className="flex items-center gap-x-3">

                        <div className="space-x-4 text-sm ms-4">
                            <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                               href="#">Terms</a>
                            <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                               href="#">Privacy</a>
                            <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                               href="#">Status</a>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="mt-3 sm:hidden">
                            <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">©
                                2024 {appName}.</p>
                        </div>

                        {/*<!-- Social Brands */}
                        <div className="space-x-4 flex">
                            <a className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                               href="#">
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16"
                                     height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                            </a>
                            <a className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                               href="#">
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16"
                                     height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            <a className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                               href="#">
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16"
                                     height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z"/>
                                </svg>
                            </a>
                            <button type="button"
                                    className="hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
                                    data-hs-theme-click-value="dark">
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                </svg>
                            </button>
                            <button type="button"
                                    className="hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
                                    data-hs-theme-click-value="light">
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M12 2v2"></path>
                                    <path d="M12 20v2"></path>
                                    <path d="m4.93 4.93 1.41 1.41"></path>
                                    <path d="m17.66 17.66 1.41 1.41"></path>
                                    <path d="M2 12h2"></path>
                                    <path d="M20 12h2"></path>
                                    <path d="m6.34 17.66-1.41 1.41"></path>
                                    <path d="m19.07 4.93-1.41 1.41"></path>
                                </svg>
                            </button>
                        </div>
                        {/*<!-- End Social Brands */}
                    </div>
                    {/*<!-- End Col */}
                </div>
            </div>
        </footer>
        // <!-- ========== END FOOTER ========== -->
    )
}

export default Footer
