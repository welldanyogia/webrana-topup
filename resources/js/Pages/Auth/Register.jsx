import {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Register() {
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

        post(route('register'));
    };

    return (
        <GuestLayout>
        <div className='py-12 px-20 w-1/2 border-2 mx-auto'>
            <Head title="Register"/>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

            {/*    <div className="mt-4">*/}
            {/*        <InputLabel htmlFor="role" value="Role"/>*/}

            {/*        <select*/}
            {/*            name="role"*/}
            {/*// make sure this and data.role is the same*/}
            {/*            id="role"*/}
            {/*            className="block w-full mt-1 rounded-md"*/}
            {/*            // onChange={onHandleChange}*/}
            {/*        >*/}
            {/*            <option value="user">User</option>*/}
            {/*            <option value="admin">Admin</option>*/}
            {/*            <option value="guest">Guest</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
            {/*<div*/}
            {/*    className="mt-7  border border-gray-200 rounded-xl shadow-sm dark:border-neutral-700">*/}
            {/*    <div className="p-4 sm:p-7">*/}
            {/*        <div className="text-center">*/}
            {/*            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>*/}
            {/*            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">*/}
            {/*                Already have an account?*/}
            {/*                <a className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"*/}
            {/*                   href="#">*/}
            {/*                    Sign in here*/}
            {/*                </a>*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        <div className="mt-5">*/}
            {/*            <div*/}
            {/*                className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">*/}
            {/*            </div>*/}

            {/*            /!*<!-- Form *!/*/}
            {/*            <form onSubmit={submit}>*/}
            {/*                <div className="grid gap-y-4">*/}
            {/*                    <div>*/}
            {/*                        <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Name</label>*/}
            {/*                        <div className="relative">*/}
            {/*                            <input type="text" id="name" name="nema"*/}
            {/*                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
            {/*                                   />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    /!*<!-- Form Group *!/*/}
            {/*                    <div>*/}
            {/*                        <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email*/}
            {/*                            address</label>*/}
            {/*                        <div className="relative">*/}
            {/*                            <input type="email" id="email" name="email"*/}
            {/*                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
            {/*                                   required aria-describedby="email-error"/>*/}
            {/*                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">*/}
            {/*                                <svg className="size-5 text-red-500" width="16" height="16"*/}
            {/*                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">*/}
            {/*                                    <path*/}
            {/*                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>*/}
            {/*                                </svg>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a*/}
            {/*                            valid email address so we can get back to you</p>*/}
            {/*                    </div>*/}
            {/*                    /!*<!-- End Form Group *!/*/}

            {/*                    /!*<!-- Form Group *!/*/}
            {/*                    <div>*/}
            {/*                        <label htmlFor="password"*/}
            {/*                               className="block text-sm mb-2 dark:text-white">Password</label>*/}
            {/*                        <div className="relative">*/}
            {/*                            <input type="password" id="password" name="password"*/}
            {/*                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
            {/*                                   required aria-describedby="password-error"/>*/}
            {/*                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">*/}
            {/*                                <svg className="size-5 text-red-500" width="16" height="16"*/}
            {/*                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">*/}
            {/*                                    <path*/}
            {/*                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>*/}
            {/*                                </svg>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters*/}
            {/*                            required</p>*/}
            {/*                    </div>*/}
            {/*                    /!*<!-- End Form Group *!/*/}

            {/*                    /!*<!-- Form Group *!/*/}
            {/*                    <div>*/}
            {/*                        <label htmlFor="confirm-password" className="block text-sm mb-2 dark:text-white">Confirm*/}
            {/*                            Password</label>*/}
            {/*                        <div className="relative">*/}
            {/*                            <input type="password" id="confirm-password" name="confirm-password"*/}
            {/*                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"*/}
            {/*                                   required aria-describedby="confirm-password-error"/>*/}
            {/*                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">*/}
            {/*                                <svg className="size-5 text-red-500" width="16" height="16"*/}
            {/*                                     fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">*/}
            {/*                                    <path*/}
            {/*                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>*/}
            {/*                                </svg>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Password*/}
            {/*                            does not match the password</p>*/}
            {/*                    </div>*/}
            {/*                    /!*<!-- End Form Group *!/*/}

            {/*                    /!*<!-- Checkbox *!/*/}
            {/*                    <div className="flex items-center">*/}
            {/*                        <div className="flex">*/}
            {/*                            <input id="remember-me" name="remember-me" type="checkbox"*/}
            {/*                                   className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>*/}
            {/*                        </div>*/}
            {/*                        <div className="ms-3">*/}
            {/*                            <label htmlFor="remember-me" className="text-sm dark:text-white">I accept the <a*/}
            {/*                                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"*/}
            {/*                                href="#">Terms and Conditions</a></label>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    /!*<!-- End Checkbox *!/*/}

            {/*                    <button type="submit"*/}
            {/*                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign*/}
            {/*                        up*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*            /!*<!-- End Form *!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
        </GuestLayout>
    );
}
