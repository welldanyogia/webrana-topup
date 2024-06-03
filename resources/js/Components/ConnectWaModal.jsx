import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {router} from "@inertiajs/react";

export default function ConnectWaModal({ token, wa }) {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // Function to reset the state
    const resetState = () => {
        setQrCode('');
        setLoading(true);
        setMessage('');
        router.reload()
    };

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await axios.post('https://api.fonnte.com/qr', {
                    type: 'qr',
                    whatsapp: wa
                }, {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.data.status) {
                    setQrCode(response.data.url);
                } else {
                    setMessage(response.data.reason);
                }
            } catch (error) {
                setMessage('An error occurred while fetching the QR code.');
            } finally {
                setLoading(false);
            }
        };

        // Call fetchQRCode initially
        fetchQRCode().catch(error => console.error('Error fetching QR code:', error));

        // Set interval to fetch QR code every 30 seconds
        const intervalId = setInterval(fetchQRCode, 30000);

        // Clean-up function to clear interval when component unmounts or dependency changes
        return () => clearInterval(intervalId);
    }, [token, wa]);

    return (
        <div id="hs-slide-down-animation-modal"
             className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Scan QR to connect
                        </h3>
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay="#hs-slide-down-animation-modal">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto mx-auto">
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                            </div>
                        ) : qrCode ? (
                            <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
                        ) : (
                            <p>{message}</p>
                        )}
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#hs-slide-down-animation-modal"
                                onClick={resetState}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
