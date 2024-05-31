import {router} from "@inertiajs/react";
import {useNavigate} from "react-router-dom";

export default function OrderConfirmationModal({formInputs,values,product,brand,price,email,phoneNumber,
                                                   paymentMethod,paymentMethodCode,productCode,fee,username}){

    const concatenatedValues = Object.values(values).join('');

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    const transactionData = {
        user_id: concatenatedValues,
        price:price,
        method_code:paymentMethodCode,
        email_customer:email,
        phone_number:phoneNumber,
        username:username,
        product_code:productCode,
        product_name:product,
        product_brand:brand,
        product_price:price,
        fee:fee
    }


    function handleSubmit(e) {
        e.preventDefault();
        router.post('/pay', transactionData)
    }

    for (const [key, value] of Object.entries(transactionData)) {
        if (key === 'email_customer') {
            continue; // Skip the email_customer key
        }
        if (value === null || value === '') {
            // alert(`Field ${key} tidak boleh kosong`);
            return; // Stop further execution if any value is null or empty
        }
    }
    return (
        <div id={`hs-vertically-centered-modal-order-confirmation`}
             className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div
                    className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Konfirmasi Pesanan
                        </h3>
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay="#hs-vertically-centered-modal-order-confirmation">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto space-y-2">
                        {
                            formInputs && formInputs.map((form) => (
                                <div className='grid grid-cols-2 justify-between w-3/4 mx-auto' key={form.id}>
                                    <div className='text-start'>{form.name}</div>
                                    <div className='text-start'>{values[form.name]}</div>
                                </div>
                            ))
                        }
                        {
                            username.length > 0  && (
                                <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                                    <div className='text-start'>Username</div>
                                    <div className='text-start'>{username}</div>
                                </div>
                            )
                        }
                        <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                            <div className='text-start'>Item</div>
                            <div className='text-start'>{product}</div>
                        </div>
                        <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                            <div className='text-start'>Harga</div>
                            <div className='text-start'>{formatRupiah(price)}</div>
                        </div>
                        <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                            <div className='text-start'>Nomor Whatsapp</div>
                            <div className='text-start'>{phoneNumber}</div>
                        </div>
                        {
                            email && true && (
                                // Tampilkan sesuatu jika email tidak null
                                <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                                    <div className='text-start'>Email</div>
                                    <div className='text-start'>{email}</div>
                                </div>
                            )
                        }
                        <div className='grid grid-cols-2 justify-between w-3/4 mx-auto'>
                            <div className='text-start'>Metode Pembayaran</div>
                            <div className='text-start'>{paymentMethod}</div>
                        </div>
                    </div>
                    <p className="mt-2 mx-auto w-3/4 text-sm text-white"
                       id="hs-input-helper-text">Pastikan detail pesanan sudah benar semua, kesalahan
                        input {import.meta.env.VITE_APP_NAME} <b>tidak bertanggungjawab</b>.</p>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#hs-vertically-centered-modal-order-confirmation">
                            Batalkan
                        </button>
                        <button type="button"
                                // data-hs-overlay="#hs-vertically-centered-modal-order-confirmation"
                                data-hs-overlay="#hs-vertically-centered-modal-order-confirmation"
                                onClick={handleSubmit}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                            Bayar sekarang
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
