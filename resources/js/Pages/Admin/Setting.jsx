import React, {useEffect, useState} from 'react';
import {useForm, router} from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import ErrorAlert from "@/Components/ErrorAlert.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function Setting({banners, flash}) {
    const [logoLight, setLogoLight] = useState(null);
    const [logoDark, setLogoDark] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [isAlert, setIsAlert] = useState(false)
    const {data, setData, post, reset, errors} = useForm({
        banner: null
    });

    useEffect(() => {
        if (flash.error) {
            setIsAlert(true);
        } else if (flash.success) {
            setIsAlert(true);
        }
    }, [flash]);

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitLogoFavicon = async (e, file, name, endpoint) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(name, file);

        try {
            router.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onSuccess: () => {
                    reset()
                    Inertia.reload()
                },
            });
            // alert('File uploaded successfully');
            // router.reload()
        } catch (error) {
            alert(flash.error);
        }
    };

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
                flash.message && <ErrorAlert isOpen={isAlert} message={flash.message} setIsOpen={setIsAlert}/>
            }
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Setting</h2>
                                </div>
                            </div>
                            <div className='p-10'>
                                <div className="mt-6 grid grid-cols-3 gap-6">
                                    <div className='flex flex-col gap-6'>
                                        Logo Light
                                        <div className='max-w-sm items-center py-10 border-2 border-white rounded-xl'>
                                            <img className='mx-auto' src='/storage/logo_light.png' alt='logo light'/>
                                        </div>
                                        <form className="max-w-sm"
                                              onSubmit={(e) => handleSubmitLogoFavicon(e, logoLight,'logo_light', '/admin/store-logo-light')}>
                                            <label htmlFor="logo_light" className="sr-only">Choose file</label>
                                            <input type="file" id="logo_light"
                                                   className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                                   onChange={(e) => handleFileChange(e, setLogoLight)}/>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">SVG, PNG or JPG
                                                (Disarankan gunakan ukuran. 160x40px).</p>
                                            <button type="submit"
                                                    className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg">Upload
                                                Logo Light
                                            </button>
                                        </form>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        Logo Dark
                                        <div className='max-w-sm items-center py-10 border-2 border-white rounded-xl'>
                                            <img className='mx-auto' src='/storage/logo_dark.png' alt='logo dark'/>
                                        </div>
                                        <form className="max-w-sm"
                                              onSubmit={(e) => handleSubmitLogoFavicon(e, logoDark, 'logo_dark', '/admin/store-logo-dark')}>
                                            <label htmlFor="logo_dark" className="sr-only">Choose file</label>
                                            <input type="file" id="logo_dark"
                                                   className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                                   onChange={(e) => handleFileChange(e, setLogoDark)}/>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">SVG, PNG or JPG
                                                (Disarankan gunakan ukuran. 160x40px).</p>
                                            <button type="submit"
                                                    className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg">Upload
                                                Logo Dark
                                            </button>
                                        </form>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                    Favicon
                                        <div className='max-w-sm items-center py-9 border-2 border-white rounded-xl'>
                                            <img className='mx-auto' src='/storage/favicon.ico' alt='favicon'/>
                                        </div>
                                        <form className="max-w-sm"
                                              onSubmit={(e) => handleSubmitLogoFavicon(e, favicon, 'favicon', '/admin/store-favicon')}>
                                            <label htmlFor="favicon" className="sr-only">Choose file</label>
                                            <input type="file" id="favicon"
                                                   className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                                   onChange={(e) => handleFileChange(e, setFavicon)}/>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">PNG or ICO
                                                (Disarankan gunakan ukuran yang rasio nya sama/persegi. (Contoh: 100x100px)).</p>
                                            <button type="submit"
                                                    className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg">Upload
                                                Favicon
                                            </button>
                                        </form>
                                    </div>

                                </div>
                                {/*Banner*/}
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium">Banners</h3>
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
                                    <form onSubmit={handleSubmit} className='space-y-6 mt-6'>
                                        <label className="block">
                                            Tambah Banner
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
