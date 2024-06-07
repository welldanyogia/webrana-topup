import { useEffect } from 'react';

export default function AddSelectInput({label,id,options,handleSelect}) {

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">{label}</label>
            <select id={id} onChange={handleSelect}
                    className="py-3 px-4 pe-9 block w-full border-primary-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}
