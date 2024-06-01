import React, { useEffect } from 'react';

export default function ErrorAlert({ message, isOpen, setIsOpen }) {
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
             className="alert-bounce fixed top-4 right-4 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
             role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
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
                                className="inline-flex bg-red-50 rounded-lg p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 dark:bg-transparent dark:hover:bg-red-800/50 dark:text-red-600"
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
