import React, {useEffect, useState} from 'react';
// import { useHistory } from 'react-router';
import ApplicationLogo from './ApplicationLogo';
import {Link, usePage} from "@inertiajs/react"; // Import komponen ApplicationLogo

function BrandSection() {
    const { categories } = usePage().props
    const [activeTab, setActiveTab] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0].category_id);
        }
    }, [categories]);

    const filteredCategories = categories
        // Filter categories based on category_status and brands with brand_status 1
        .filter(tab =>
            tab.category_status === 1 && // Filter categories with category_status 1
            tab.brands.some(brand => brand.brand_status === 1) // Filter categories with at least one brand with brand_status 1
        );
    return (
        <div className="w-full rounded-lg shadow-md bg-neutral-800/50">
            <div className="border-b border-neutral-700 px-4">
                <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs" role="tablist">
                    {filteredCategories && filteredCategories.map(tab => (
                        <button
                            key={tab.category_id}
                            type="button"
                            className={`hs-tab-active:font-semibold hs-tab-active:border-neutral-400 hs-tab-active:text-neutral-100 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-md whitespace-nowrap text-neutral-300 hover:text-neutral-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-200 ${activeTab === tab.category_id ? 'active' : ''}`}
                            id={`basic-tabs-item-${tab.category_id}`}
                            data-hs-tab={`#basic-tabs-${tab.category_id}`}
                            aria-controls={`basic-tabs-${tab.category_id}`}
                            role="tab"
                            onClick={() => setActiveTab(tab.category_id)}
                        >
                            {tab.category_name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-3 p-4">
                {categories.map(tab => (
                    <div
                        key={tab.category_id}
                        id={`basic-tabs-${tab.category_id}`}
                        className={`${activeTab === tab.category_id ? '' : 'hidden'}
                        grid grid-cols-10 max-md:grid-cols-6 sm:grid-cols-6 sm:gap-3 lg:grid-cols-10  max-sm:grid-cols-3 max-sm:gap-3`
                    }
                        role="tabpanel"
                        aria-labelledby={`basic-tabs-item-${tab.category_id}`}
                    >
                        {tab.brands
                            .filter(card => card.brand_status === 1) // Filter hanya brand dengan brand_status 1
                            .map((card, index) => (
                                <div>
                                    <Link
                                        key={card.brand_id}
                                        className="relative shadow-sm rounded-xl grid-cols-1 focus:outline-none focus:ring-2 focus:ring-neutral-700"
                                        href={`/brand/${card.brand_id}`}
                                        style={{backdropFilter: 'blur(10px)'}} // Efek blur pada latar belakang
                                        onMouseEnter={() => setHoveredButton(index)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        <img
                                            className="rounded-xl"
                                            src={card.image_url ? card.image_url :
                                                'https://placehold.co/120x200'
                                                // 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80'
                                        }
                                            alt={card.title}
                                        />
                                        {hoveredButton === index && (
                                            <div className="absolute flex-col gap-4 rounded-xl border-neutral-700 border-4 inset-0 backdrop-blur flex items-center justify-center bg-neutral-900/70">
                                                <img className='hidden dark:flex w-24 max-sm:w-10' src="/storage/logo_dark.png" alt="logo"/>
                                                <img className='flex dark:hidden w-24 max-sm:w-10' src="/storage/logo_dark.png" alt="logo"/>
                                                <h2 className='text-white text-center font-bold max-sm:hidden'>{card.brand_name}</h2>
                                            </div>
                                        )}
                                    </Link>
                                    <div>
                                    <h1 className={`${hoveredButton === index && `hidden`} text-white text-center font-bold mx-auto max-sm:hidden`}>{card.brand_name}</h1>
                                    </div>
                                </div>
                            ))}
            </div>
            ))}
        </div>
</div>
)
    ;
}

export default BrandSection;
