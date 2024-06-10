export default function PaymentGatewayConfigurationAlert(){
    return (
        <div
            className="bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
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
                <div className="ms-4">
                    <h3 className="text-sm font-semibold">
                        Payment Gateway: Membutuhkan Konfigurasi Payment Gateway
                    </h3>
                    <div className="mt-1 text-sm text-yellow-700">
                        Harap dicatat bahwa untuk menggunakan layanan Payment Gateway, konfigurasi Anda perlu diatur dengan benar. Pastikan Anda telah mengisi semua informasi yang diperlukan untuk mulai menggunakan layanan Payment Gateway.
                    </div>
                    <div className="mt-4">
                        <div className="flex space-x-3">
                            <a href="/Admin/PaymentGateway/PaymentGateway"
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
                                Pergi ke Payment Gateway
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
