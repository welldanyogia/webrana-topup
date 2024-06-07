import React, { useEffect } from 'react';
import { usePage } from "@inertiajs/react";

export default function CarouselHero() {
    const { banners } = usePage().props;

    useEffect(() => {
        // Initialize the carousel using any JavaScript library if required
    }, []);

    return (
        // Slider
        <div data-hs-carousel='{
                "loadingclassNamees": "opacity-0",
                "isAutoPlay": true
              }' className="relative">
            <div className="hs-carousel relative overflow-hidden w-full min-h-96 max-sm:min-h-40 rounded-lg">
                <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700">
                    {
                        banners && banners.map((banner, index) => (
                            <div key={index} className="hs-carousel-slide flex-shrink-0 w-full p-2">
                                <div className="flex justify-center h-full">
                                    <img className="rounded-xl"
                                         src={`/${banner.banner_url}`}
                                         alt={`Banner ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button type="button"
                    className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-primary-800 hover:bg-primary-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10">
                <span className="text-2xl" aria-hidden="true">
                  <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                       strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </span>
                <span className="sr-only">Previous</span>
            </button>
            <button type="button"
                    className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-primary-800 hover:bg-primary-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10">
                <span className="sr-only">Next</span>
                <span className="text-2xl" aria-hidden="true">
                  <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                       strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </span>
            </button>

            <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
                {banners && banners.map((_, index) => (
                    <span key={index}
                          className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-primary-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"></span>
                ))}
            </div>
        </div>
        // End Slider
    )
}
