import React, {useState} from "react";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {router, usePage} from "@inertiajs/react";
import SuccessAlert from "@/Components/SuccessAlert.jsx";
import ConnectWaModal from "@/Components/ConnectWaModal.jsx";
import { VscDebugDisconnect } from "react-icons/vsc";
import ErrorAlert from "@/Components/ErrorAlert.jsx";

export default function WhatsappGateway(props) {
    const { auth, error, user,acc_token,wa_owner,flash,devices } = usePage().props
    const [waOwner, setWaOwner] = useState(wa_owner ? wa_owner : '')
    const [fonnteToken, setFonnteToken] = useState(acc_token? acc_token : '')
    const [isOpen, setIsOpen] = useState(true)
    const [token,setToken] = useState('')
    const [wa,setWa] = useState('')
    const [disconnectStatus, setDisconnectStatus] = useState({
        detail: '',
        status: false
    });

    console.log(devices)
    const disconnectDevice = async (tkn) => {
        try {
            const response = await axios.post('https://api.fonnte.com/disconnect', null, {
                headers: {
                    'Authorization': tkn
                }
            });
            router.reload()
            setDisconnectStatus(response.data);
        } catch (error) {
            router.reload()
            console.error('Error disconnecting device:', error);
            setDisconnectStatus({ detail: 'An error occurred while disconnecting the device.', status: false });
        }
    };
    function handleToken(e,token) {
        e.preventDefault()
        setToken(token)
    }
    function handleWa(e,wa) {
        e.preventDefault()
        setWa(wa)
    }
    function handleChangeToken(e) {
        e.preventDefault()
        setFonnteToken(e.target.value)
    }
    function handleChangeWaOwner(e) {
        e.preventDefault()
        setWaOwner(e.target.value)
    }
    function convertTimestampToDate(timestamp) {
        const date = new Date(timestamp * 1000); // Mengonversi detik ke milidetik
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Bulan dimulai dari 0, jadi tambahkan 1
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
    return(
        <AuthenticatedAdmin
            auth={props.auth}
            error={props.error}
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                Whatsapp Gateway
            </h2>
            }
        >
            {
                flash && flash.success && (
                    <SuccessAlert isOpen={isOpen} setIsOpen={setIsOpen} message={flash.success}/>
                )
            }
            {
                flash && flash.error && (
                    <SuccessAlert isOpen={isOpen} setIsOpen={setIsOpen} message={flash.error}/>
                )
            }
            {disconnectStatus.status ? (
                <SuccessAlert isOpen={isOpen} setIsOpen={setIsOpen} message={disconnectStatus.detail}/>
            ) : (
                <ErrorAlert isOpen={isOpen} setIsOpen={setIsOpen} message={disconnectStatus.detail}/>
            )}
            {/*<!-- Card Section */}
            <div className="text-black dark:text-white px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                {/*<!-- Card */}
                <div className="bg-white rounded-xl shadow shadow-gray-400 p-4 sm:p-7 dark:bg-neutral-800">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Fonnte Whatsapp Gateway
                        </h2>
                    </div>

                    <form>
                        {/*<!-- Grid */}
                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="acc_token"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Account Token
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Account Token dapatkan pada bagian setting
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="acc_token" type="text"
                                           onChange={handleChangeToken}
                                           value={fonnteToken}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Account Token Fonnte"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-3">
                                <label htmlFor="wa_owner"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Owner Whatsapp
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Masukkan WA Owner untuk menerima notifikasi transaksi manual.
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="wa_owner" type="number"
                                           onChange={handleChangeWaOwner}
                                           value={waOwner}
                                           className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Owner Whatsapp"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                        </div>
                        {/*<!-- End Grid */}
                        <div className="mt-5 flex justify-end gap-x-2">
                            <button type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        router.post('/api/send-message')
                                    }}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Test Messages Owner
                            </button>
                            <button type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        router.post('/admin/whatsapp/store', {
                                            acc_token: fonnteToken,
                                            wa_owner: waOwner
                                        })
                                    }}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
                {/*<!-- End Card */}
            </div>
            {/*<!-- End Card Section */}

            <div className="text-black dark:text-white px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                <div className="bg-white rounded-xl shadow shadow-gray-400 p-4 sm:p-7 dark:bg-neutral-800 space-y-6">
                    <div className='mx-auto grid grid-cols-3 gap-8'>
                        <div className='bg-gradient-to-b dark:bg-gray-600/50 p-6 rounded-xl'>
                            <span className='text-md font-bold'>Connected : {devices.connected}</span>
                        </div>
                        <div className='bg-gradient-to-b dark:bg-gray-600/50 p-6 rounded-xl'>
                            <span className='text-md font-bold'>Devices : {devices.devices}</span>
                        </div>
                        <div className='bg-gradient-to-b dark:bg-gray-600/50 p-6 rounded-xl'>
                            <span className='text-md font-bold'>Messages : {devices.messages}</span>
                        </div>
                    </div>
                    <div className='mx-auto grid gap-6'>
                        {
                            devices.data && devices.data.map((data)=>(
                                <div className='bg-gradient-to-b dark:bg-gray-600/50 p-6 rounded-xl grid grid-cols-2'>
                                    <div className='col-span-1 grid grid-cols-2 gap-6'>
                                        <div className='grid text-sm gap-2'>
                                            <h1 className='font-bold text-center border-b border-white'>Device</h1>
                                            <div className='text-left capitalize flex gap-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                                                </svg>
                                                {data.device}
                                            </div>
                                            <div className='text-left capitalize flex gap-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                                </svg>

                                                {data.name}
                                            </div>
                                            <div className='text-left capitalize'>
                                                {
                                                    data.status === 'disconnect' && (
                                                        <span
                                                            className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                                                          <span
                                                              className="size-1.5 inline-block rounded-full bg-red-800 dark:bg-red-500"></span>
                                                            {data.status}
                                                        </span>
                                                    )
                                                }
                                                {
                                                    data.status === 'connect' && (
                                                        <span
                                                            className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
                                                          <span
                                                              className="size-1.5 inline-block rounded-full bg-teal-800 dark:bg-teal-500"></span>
                                                            {data.status}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='grid text-sm gap-2'>
                                            <h1 className='font-bold text-center border-b border-white'>Package</h1>
                                            <div className='text-left capitalize flex gap-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                                                </svg>
                                                {data.package}
                                            </div>
                                            <div className='text-left capitalize flex gap-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                                                </svg>
                                                {data.quota}
                                            </div>
                                            <div className='text-left capitalize'>
                                                Expired : {convertTimestampToDate(data.expired)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex gap-6 p-10'>
                                        <button type={"button"}
                                                onClick={(e) => {
                                                    handleWa(e, data.device)
                                                    handleToken(e, data.token)
                                                }}
                                                data-hs-overlay="#hs-slide-down-animation-modal"
                                                className='bg-green-600 flex gap-2 items-center p-2 rounded-xl hover:bg-green-400 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
                                            </svg>

                                            Connect
                                        </button>
                                        <button type={"button"}
                                                onClick={(e) => {
                                                    disconnectDevice(data.token)
                                                }}
                                                className='bg-red-600 flex gap-2 items-center p-2 rounded-xl hover:bg-red-400 text-sm'>
                                            <VscDebugDisconnect />

                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <ConnectWaModal wa={wa} token={token}/>
        </AuthenticatedAdmin>
    )
}
