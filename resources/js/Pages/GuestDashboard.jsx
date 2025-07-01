import React, {useEffect, useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, usePage} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import CarouselHero from "@/Components/CarouselHero.jsx";
import BrandSection from "@/Components/BrandSection.jsx";
import SigninModal from "@/Components/SigninModal.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";
import SignupModal from "@/Components/SignupModal.jsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function GuestDashboard(props) {
    const { flash, errors,auth } = usePage().props;
    const [isAlert, setIsAlert] = useState(false)

    const isAuthenticated = auth?.user && auth.user.role === 'user';
    const Layout = isAuthenticated ? Authenticated : GuestLayout;

    useEffect(() => {
        if (flash.error) {
            setIsAlert(true);
        }
    }, [flash.error]);
    return (
        <Layout user={auth?.user}>
            <Head title="Beranda"/>
            {
                flash.error &&  <ErrorAlert isOpen={isAlert} message={flash.error} setIsOpen={setIsAlert}/>
            }
            <div className="py-12">

                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8 dark:text-white">
                    <CarouselHero/>
                    <div className="text-center py-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-white">Beli Voucher Game &amp; Pulsa Online</h1>
                        <p className="text-primary-600 dark:text-neutral-300 mt-2">Transaksi cepat, aman dan terpercaya layaknya Codashop.</p>
                    </div>
                    <BrandSection/>

                <SigninModal />
                <SignupModal />
                </div>
            </div>

        </Layout>
    );
}
