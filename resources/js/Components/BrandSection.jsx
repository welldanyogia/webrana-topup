import React, {useEffect, useState} from 'react';
// import { useHistory } from 'react-router';
import ApplicationLogo from './ApplicationLogo';
import {Link, usePage} from "@inertiajs/react"; // Import komponen ApplicationLogo

function BrandSection() {
    const { categories } = usePage().props
    const [activeTab, setActiveTab] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    // const history = useHistory();

    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0].category_id);
        }
    }, [categories]);

    const filteredCategories = categories.filter(tab => tab.brands.length > 0);
    return (
        <div className="w-full rounded-lg shadow-md">
            <div className="border-b border-primary-200 px-4 dark:border-neutral-700">
                <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs" role="tablist">
                    {filteredCategories && filteredCategories.map(tab => (
                        <button
                            key={tab.category_id}
                            type="button"
                            className={`hs-tab-active:font-semibold hs-tab-active:border-secondary-600 hs-tab-active:text-secondary-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-md whitespace-nowrap text-primary-500 hover:text-secondary-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-secondary-500 ${activeTab === tab.category_id ? 'active' : ''}`}
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
                        className={`${activeTab === tab.category_id ? '' : 'hidden'} grid grid-cols-5 max-md:grid-cols-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5  max-sm:grid-cols-3 max-sm:gap-3`}
                        role="tabpanel"
                        aria-labelledby={`basic-tabs-item-${tab.category_id}`}
                    >
                        {tab.brands.map((card, index) => (
                            <div>
                            <Link
                                // onClick={() => history.push('/product')}

                                key={card.brand_id}
                                className="relative shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
                                href={`/brand/${card.brand_id}`}
                                style={{backdropFilter: 'blur(10px)'}} // Efek blur pada latar belakang
                                onMouseEnter={() => setHoveredButton(index)}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <img className="rounded-xl"
                                     src={card.image_url ? card.image_url : 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80'}
                                     alt={card.title}/>
                                {hoveredButton === index && (
                                    <div
                                        className="absolute flex-col gap-y-5 rounded-xl border-secondary-500 border-4 inset-0 backdrop-blur flex items-center justify-center">
                                        {/*<ApplicationLogo className="w-16 h-16" /> /!* Icon di tengah saat dihover *!/*/}
                                        <img className='hidden dark:flex max-sm:w-14' src="/storage/logo_dark.png"
                                             alt="logo"/>
                                        <img className='flex dark:hidden max-sm:w-14' src="/storage/logo_dark.png"
                                             alt="logo"/>
                                        <h2 className='text-black dark:text-white text-center'>{card.brand_name}</h2>
                                    </div>
                                )}
                                {/*<h1 className={`${hoveredButton === index && `hidden`} text-black dark:text-neutral-400 text-center`}>{card.brand_name}</h1>*/}
                            </Link>
                            <h1 className={`${hoveredButton === index && `hidden`} text-black dark:text-white text-center`}>{card.brand_name}</h1>
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
