import { useForm} from "@inertiajs/react";
import {useEffect} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

function SignupModal({...props}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        // role: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'),);
    };

    return(
        <div {...props} id="hs-modal-signup" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div
                    className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="absolute top-2 end-2">
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700"
                                data-hs-overlay="#hs-modal-signup">
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
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                Already have an account?
                                <button type='button'
                                        data-hs-overlay="#hs-modal-signin"
                                        className="text-secondary-600 decoration-2 hover:underline font-medium dark:text-secondary-500">
                                    Sign in here
                                </button>
                            </p>
                        </div>

                        <div className="mt-5">
                            <div
                                className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or
                            </div>

                            {/*<!-- Form */}
                            <form onSubmit={submit}>
                                <div className="grid gap-y-4">
                                    {/*<!-- Form Group */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm mb-2 dark:text-white">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <input type="name" id="name" name="name"
                                                   onChange={(e) => setData('name', e.target.value)}
                                                   className="py-3 px-4 block w-full bg-white border-secondary-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   required aria-describedby="name-error"/>
                                            {/*<InputError message={errors.name} className="mt-2"/>*/}
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include
                                            a name so we can get back to you</p>
                                    </div>
                                    {/*<!-- End Form Group */}
                                    {/*<!-- Form Group */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email
                                            address</label>
                                        <div className="relative">
                                            <input type="email" id="email" name="email"
                                                   onChange={(e) => setData('email', e.target.value)}
                                                   className="py-3 px-4 block w-full border-secondary-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   required aria-describedby="email-error"/>
                                            <InputError message={errors.email} className="mt-2"/>
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include
                                            a valid email address so we can get back to you</p>
                                    </div>
                                    {/*<!-- End Form Group */}

                                    {/*<!-- Form Group */}
                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm mb-2 dark:text-white">Password</label>
                                        <div className="relative">
                                            <input type="password" id="password" name="password"
                                                   onChange={(e) => setData('password', e.target.value)}
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   required aria-describedby="password-error"/>
                                            <InputError message={errors.password} className="mt-2"/>
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+
                                            characters required</p>
                                    </div>
                                    {/*<!-- End Form Group */}

                                    {/*<!-- Form Group */}
                                    <div>
                                        <label htmlFor="confirm-password"
                                               className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                                        <div className="relative">
                                            <input type="password" id="confirm-password" name="confirm-password"
                                                   onChange={(e) => setData('password_confirmation', e.target.value)}
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   required aria-describedby="confirm-password-error"/>
                                            <InputError message={errors.password_confirmation} className="mt-2"/>
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2"
                                           id="confirm-password-error">Password does not match the password</p>
                                    </div>
                                    {/*<!-- End Form Group */}

                                    {/*<!-- Checkbox */}
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input id="remember-me" name="remember-me" type="checkbox" required={true}
                                                   className="shrink-0 mt-0.5 border-gray-200 rounded text-secondary-600 focus:ring-secondary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-secondary-500 dark:checked:border-secondary-500 dark:focus:ring-offset-gray-800"/>
                                        </div>
                                        <div className="ms-3">
                                            <label htmlFor="remember-me" className="text-sm dark:text-white">I accept
                                                the <a
                                                    className="text-secondary-600 decoration-2 hover:underline font-medium dark:text-secondary-500"
                                                    href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    {/*<!-- End Checkbox */}

                                    <button type="submit" data-hs-overlay='#hs-modal-signup'
                                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary-600 text-white hover:bg-secondary-700 disabled:opacity-50 disabled:pointer-events-none">Sign
                                        up
                                    </button>
                                </div>
                            </form>
                            {/*<!-- End Form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupModal
