import React, { useEffect } from 'react';

export default function SuccessAlert({ message, isOpen, setIsOpen }) {
    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                setIsOpen(false);
            }, 6000); // Automatically dismiss the alert after 3 seconds
            return () => clearTimeout(timeout);
        }
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div id="dismiss-alert"
             className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
             role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                </div>
                <div className="ms-2">
                    <div className="text-sm font-medium">
                        {message}
                    </div>
                </div>
                <div className="ps-3 ms-auto">
                    <div className="-mx-1.5 -my-1.5">
                        <button type="button"
                                className="inline-flex bg-teal-50 rounded-lg p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-50 focus:ring-teal-600 dark:bg-transparent dark:hover:bg-teal-800/50 dark:text-teal-600"
                                onClick={() => setIsOpen(false)}>
                            <span className="sr-only">Dismiss</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
