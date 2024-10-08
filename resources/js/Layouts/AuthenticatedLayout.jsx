import { useState } from 'react';
import Footer from "@/Components/Footer.jsx";
import AuthNavbar from "@/Components/AuthNavbar.jsx";

export default function Authenticated({user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen sm:justify-center pt-6 sm:pt-0 bg-primary-100 dark:bg-primary-dark-900">
            <AuthNavbar
                user={user}
            />

            {/*<div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-primary-dark-800 shadow-md overflow-hidden sm:rounded-lg">*/}
            {/*    {children}*/}
            {/*</div>*/}
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}
