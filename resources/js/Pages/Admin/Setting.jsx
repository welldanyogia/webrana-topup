import React, {useEffect, useState} from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";

export default function Setting({ banners,flash }) {
    const [isAlert, setIsAlert] = useState(false)
    const { data, setData, post, reset, errors } = useForm({
        banner: null
    });

    useEffect(() => {
        if (flash.error) {
            setIsAlert(true);
        } else if (flash.success) {
            setIsAlert(true);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(route('admin.settings.destroy', id));
        }
    };

    return (
        <AuthenticatedAdmin>
            {
                flash.message &&  <ErrorAlert isOpen={isAlert} message={flash.message} setIsOpen={setIsAlert}/>
            }
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Banner</h2>
                                </div>
                            </div>
                            <div className='p-10'>
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium">Existing Banners</h3>
                                    <ul className="mt-4 space-y-2">
                                        {banners.map((banner) => (
                                            <li key={banner.id} className="flex items-center justify-between">
                                                <img src={`/${banner.banner_url}`} alt="Banner" className="h-20"/>
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="ml-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="max-w-sm">
                                    <form onSubmit={handleSubmit} className='space-y-6'>
                                        <label className="block">
                                            <span className="sr-only">Choose profile photo</span>
                                            <input type="file" onChange={e => setData('banner', e.target.files[0])}
                                                   className="block w-full text-sm text-gray-500
                                                file:me-4 file:py-2 file:px-4
                                                file:rounded-lg file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-600 file:text-white
                                                hover:file:bg-blue-700
                                                file:disabled:opacity-50 file:disabled:pointer-events-none
                                                dark:text-neutral-500
                                                dark:file:bg-blue-500
                                                dark:hover:file:bg-blue-400
                                            "/>
                                            {errors.banner && <div className="text-red-600 mt-2">{errors.banner}</div>}
                                        </label>
                                        <div>
                                            <button
                                                type="submit"
                                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <path d="M5 12h14"/>
                                                    <path d="M12 5v14"/>
                                                </svg>
                                                Tambah Banner
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    );
}
