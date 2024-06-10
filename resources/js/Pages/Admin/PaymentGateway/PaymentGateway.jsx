import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import Alert from "@/Components/Alert.jsx";
import TripayTable from "@/Components/TripayTable.jsx";
import {Inertia} from "@inertiajs/inertia";
import Tripay from "@/Pages/Admin/PaymentGateway/Partials/Tripay.jsx";
import Xendit from "@/Pages/Admin/PaymentGateway/Partials/Xendit.jsx";


export default function PaymentGateway(props) {
    const {tripay,paymentGateways,xendit,ipAddress, flash} = props
    const [alertVisible, setAlertVisible] = useState(true);

    const activePaymentGateways = paymentGateways.filter(gateway => gateway.payment_gateway_status);
    const nonActivePaymentGateways = paymentGateways.filter(gateway => !gateway.payment_gateway_status);


    const updateStatus = (gatewayId, status) => {
        Inertia.patch(`/payment-gateways/${gatewayId}/status`, { status }, {
            onSuccess: () => {
                console.log('Payment gateway status updated successfully');
            },
            onError: (errors) => {
                console.error('Failed to update payment gateway status:', errors);
            }
        });
    };

    const isTripayActive = () => {
        return activePaymentGateways.some(gateway => gateway.payment_gateway_name === 'Tripay');
    };
    const isXenditActive = () => {
        return activePaymentGateways.some(gateway => gateway.payment_gateway_name === 'Xendit');
    };


    function handleDismiss() {
        setAlertVisible(false);
    }

    return (
        <AuthenticatedAdmin
            auth={props.auth}
            error={props.error}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                Konfigurasi Payment Gateway
            </h2>
            }
        >
            {flash && flash.message && alertVisible && (
                <Alert onDismiss={handleDismiss}>
                    {flash.message}
                </Alert>
            )}
            <div className='w-full flex justify-between'>
                <div>Payment Gateway</div>
                <div className="hs-dropdown relative inline-flex">
                    {activePaymentGateways.map(gateway => (
                        <button id="hs-dropdown-default" type="button"
                                key={gateway.payment_gateway_id}
                                className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                            {gateway.payment_gateway_name}
                            <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6"/>
                            </svg>
                        </button>
                    ))}

                    <div
                        className="hs-dropdown-menu z-50 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                        aria-labelledby="hs-dropdown-default">
                        {
                            nonActivePaymentGateways.map(gateway => (
                                <button
                                    key={gateway.payment_gateway_id}
                                    onClick={() => updateStatus(gateway.payment_gateway_id, true)}
                                    className="flex  w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                    type="button">
                                    {gateway.payment_gateway_name}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
            {isTripayActive() && <Tripay tripay={tripay} ipAddress={ipAddress} />}
            {isXenditActive() && <Xendit ipAddress={ipAddress} xendit={xendit} />}


        </AuthenticatedAdmin>
    )
}
