import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import CarouselHero from "@/Components/CarouselHero.jsx";
import BrandSection from "@/Components/BrandSection.jsx";

export default function Dashboard({auth}) {
    return (
        <Authenticated
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">User Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-white">
                    {/*<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">*/}
                    {/*    <div className="p-6 bg-white border-b border-gray-200">*/}
                    {/*        You're logged in as User!*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <CarouselHero/>
                    <BrandSection/>
                </div>
            </div>
        </Authenticated>
    );
}
