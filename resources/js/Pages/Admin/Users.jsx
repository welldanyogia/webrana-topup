import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import React from "react";
import {format} from "date-fns";

export default function Users({users}) {
    const getInitials = (name) => {
        const nameParts = name.split(' ');

        const initials = nameParts.slice(0, 2).map(part => part[0]).join('');

        return initials.toUpperCase();
    };
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp');
    };
    return (
        <AuthenticatedAdmin>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/*<!-- Header >*/}
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Users
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                                        Add users, edit and more.
                                    </p>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th scope="col" className="ps-6 py-3 text-start">
                                    </th>

                                    <th scope="col" className="ps-6 py-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Name
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Role
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Status
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Total Transaksi
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                                          <span
                                              className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            Created
                                          </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-end"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="size-px whitespace-nowrap">
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                <span
                                                    className="inline-flex items-center justify-center size-[38px] rounded-full bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700">
                                                  <span
                                                      className="font-medium text-sm text-gray-800 leading-none dark:text-neutral-200">{getInitials(user.name)}</span>
                                                </span>
                                                    <div className="grow">
                                                    <span
                                                        className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{user.name}</span>
                                                        <span
                                                            className="block text-sm text-gray-500 dark:text-neutral-500">{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="h-px w-72 whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{user.role.toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                          <span
                                              className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                            <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16"
                                                 height="16"
                                                 fill="currentColor" viewBox="0 0 16 16">
                                              <path
                                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                            Active
                                          </span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                    <span
                                                        className="text-xs text-gray-500 dark:text-neutral-500">{user.transaction.length}</span>
                                                    {/*<div*/}
                                                    {/*    className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">*/}
                                                    {/*    <div*/}
                                                    {/*        className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-neutral-200"*/}
                                                    {/*        role="progressbar" style={{width: '100%'}}*/}
                                                    {/*        aria-valuenow="100"*/}
                                                    {/*        aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                            <span
                                                className="text-sm text-gray-500 dark:text-neutral-500">{formatDate(user.created_at)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdmin>
    )
}
