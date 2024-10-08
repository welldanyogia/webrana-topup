import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { LoadingCustom } from "@/Components/LoadingCustom.jsx";

export const OrderModal = ({ product,isOpen }) => {
    const [formValues, setFormValues] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormInputChange = (id, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/digiflazz/order", {
                buyer_sku_code: product.buyer_sku_code,
                customer_no: combineFormValues(),
            });

            if (response.status === 200) {
                setIsDialogOpen(false); // Close the dialog
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error creating form", error);
        }
    };

    const combineFormValues = () => {
        const combinedValues = Object.values(formValues).join("");
        console.log("Combined Form Values: ", combinedValues);
        return combinedValues;
    };

    function formatRupiah(amount) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    }

    return (
        // <div className="w-full">
        //     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        //         <DialogTrigger asChild>
        //             <Button
        //                 variant="outline"
        //                 onClick={() => setIsDialogOpen(true)}
        //             >
        //                 <FaShoppingCart />
        //             </Button>
        //         </DialogTrigger>
        //         <DialogContent className="w-full flex flex-col items-center">
        //             <DialogHeader>
        //                 <DialogTitle>
        //                     {product.product_name.toUpperCase()} |{" "}
        //                     {product.buyer_sku_code}
        //                 </DialogTitle>
        //                 <DialogDescription>{product.desc}</DialogDescription>
        //             </DialogHeader>
        //             <div className="grid grid-cols-2 gap-4 py-4">
        //                 <div className="flex flex-col gap-2">
        //                     <div className="flex justify-between">
        //                         <span>Price</span>
        //                         <span>{formatRupiah(product.price)}</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Selling Price</span>
        //                         <span>
        //                             {formatRupiah(product.selling_price)}
        //                         </span>
        //                     </div>
        //                     {/* Add other fields like Fee Itemku and Profit if needed */}
        //                 </div>
        //                 <div className="flex flex-col space-y-2">
        //                     {/* Render form inputs here if necessary */}
        //                 </div>
        //             </div>
        //             <DialogFooter className="mt-auto">
        //                 <Button type="submit" onClick={handleSubmit}>
        //                     {isLoading ? (
        //                         <LoadingCustom title={"Loading"} />
        //                     ) : (
        //                         "Order"
        //                     )}
        //                 </Button>
        //             </DialogFooter>
        //         </DialogContent>
        //     </Dialog>
        // </div>
        <div id="hs-static-backdrop-modal-order"
             className={`hs-overlay ${isOpen ? 'block' : 'hidden'} size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]`}
             data-hs-overlay-keyboard="false">
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div
                    className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="absolute top-2 end-2">
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700"
                                data-hs-overlay="#hs-static-backdrop-modal-order">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h2 className="block text-2xl font-bold text-gray-800 dark:text-neutral-200">Sign in</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                Don't have an account yet?
                                <button type='button'
                                        className="text-secondary-600 decoration-2 hover:underline font-medium dark:text-secondary-500"
                                        data-hs-overlay="#hs-modal-signup">
                                    Sign up here
                                </button>
                            </p>
                        </div>

                        <div className="mt-5">

                            <div
                                className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-800 dark:after:border-neutral-800">
                            </div>

                            {/*<!-- Form */}
                            {/*<form onSubmit={handleSubmit}>*/}
                            {/*    <div className="grid gap-y-4">*/}
                            {/*        /!*<!-- Form Group *!/*/}
                            {/*        <div>*/}
                            {/*            <label htmlFor="email-signin" className="block text-sm mb-2 dark:text-white">Email*/}
                            {/*                address</label>*/}
                            {/*            <div className="relative">*/}
                            {/*                <input type="email" id="email-signin" name="email-signin" value={data.email}*/}
                            {/*                       onChange={(e) => setData('email', e.target.value)}*/}
                            {/*                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                            {/*                       required aria-describedby="email-error"/>*/}
                            {/*                {errors.email && <div>{errors.email}</div>}*/}
                            {/*                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">*/}
                            {/*                    <svg className="size-5 text-red-500" width="16" height="16"*/}
                            {/*                         fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">*/}
                            {/*                        <path*/}
                            {/*                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>*/}
                            {/*                    </svg>*/}
                            {/*                </div>*/}

                            {/*            </div>*/}
                            {/*            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include*/}
                            {/*                a valid email address so we can get back to you</p>*/}
                            {/*        </div>*/}
                            {/*        /!*<!-- End Form Group *!/*/}

                            {/*        /!*<!-- Form Group *!/*/}
                            {/*        <div>*/}
                            {/*            <div className="flex justify-between items-center">*/}
                            {/*                <label htmlFor="password-signin"*/}
                            {/*                       className="block text-sm mb-2 dark:text-white">Password</label>*/}
                            {/*                <a className="text-sm text-secondary-600 decoration-2 hover:underline font-medium"*/}
                            {/*                   href={route('password.request')}>Forgot password?</a>*/}
                            {/*            </div>*/}
                            {/*            <div className="relative">*/}
                            {/*                <input type="password" id="password-signin" name="password-signin"*/}
                            {/*                       value={data.password}*/}
                            {/*                       onChange={(e) => setData('password', e.target.value)}*/}
                            {/*                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
                            {/*                       required aria-describedby="password-error"/>*/}
                            {/*                {errors.password && <div>{errors.password}</div>}*/}
                            {/*                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">*/}
                            {/*                    <svg className="size-5 text-red-500" width="16" height="16"*/}
                            {/*                         fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">*/}
                            {/*                        <path*/}
                            {/*                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>*/}
                            {/*                    </svg>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+*/}
                            {/*                characters required</p>*/}
                            {/*        </div>*/}
                            {/*        /!*<!-- End Form Group *!/*/}

                            {/*        /!*<!-- Checkbox *!/*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="flex">*/}
                            {/*                <input id="remember-me-signin" name="remember" type="checkbox"*/}
                            {/*                       checked={data.remember}*/}
                            {/*                       onChange={(e) => setData('remember', e.target.value)}*/}
                            {/*                       className="shrink-0 mt-0.5 border-gray-200 rounded text-secondary-600 focus:ring-secondary-500 dark:bg-neutral-800 dark:border-neutral-800 dark:checked:bg-secondary-500 dark:checked:border-secondary-500 dark:focus:ring-offset-gray-800"/>*/}
                            {/*            </div>*/}
                            {/*            <div className="ms-3">*/}
                            {/*                <label htmlFor="remember-me-signin" className="text-sm dark:text-white">Remember*/}
                            {/*                    me</label>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        /!*<!-- End Checkbox *!/*/}
                            {/*        /!*<button type="submit"*!/*/}
                            {/*        /!*        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary-600 text-white hover:bg-secondary-700 disabled:opacity-50 disabled:pointer-events-none">Sign*!/*/}
                            {/*        /!*    in*!/*/}
                            {/*        /!*</button>*!/*/}

                            {/*        <button type="submit" disabled={processing}*/}
                            {/*                data-hs-overlay="#hs-static-backdrop-modal-order"*/}
                            {/*                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary-600 text-white hover:bg-secondary-700 disabled:opacity-50 disabled:pointer-events-none">Sign*/}
                            {/*            in*/}
                            {/*        </button>*/}
                            {/*        /!*<PrimaryButton className="ms-4" disabled={processing} data-hs-overlay="#hs-modal-signin">*!/*/}
                            {/*        /!*    Log in*!/*/}
                            {/*        /!*</PrimaryButton>*!/*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                            {/*<!-- End Form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
