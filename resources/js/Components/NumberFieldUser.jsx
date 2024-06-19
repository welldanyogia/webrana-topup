export default function NumberFieldUser({form,handleChange}) {
    return (
        <div className="relative">
            <input type="number" id={`hs-floating-primary-input-${form.id}`} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm placeholder:text-transparent focus:border-secondary-500 focus:ring-secondary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary-dark-900 dark:border-transparent dark:text-white dark:focus:ring-primary-dark-600
                                                    focus:pt-6
                                                    focus:pb-2
                                                    [&:not(:placeholder-shown)]:pt-6
                                                    [&:not(:placeholder-shown)]:pb-2
                                                    autofill:pt-6
                                                    autofill:pb-2"
                   placeholder={form.name}
                   onChange={handleChange}
            />
            <label
                htmlFor={`hs-floating-gray-input-${form.id}`}
                className="absolute top-0 left-0 p-4 w-full h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                           peer-focus:scale-90
                           peer-focus:translate-x-0.5
                           peer-focus:-translate-y-1.5
                           peer-focus:text-gray-500 dark:peer-focus:text-secondary-500
                           peer-[:not(:placeholder-shown)]:scale-90
                           peer-[:not(:placeholder-shown)]:translate-x-0.5
                           peer-[:not(:placeholder-shown)]:-translate-y-1.5
                           peer-[:not(:placeholder-shown)]:text-secondary-500 dark:peer-[:not(:placeholder-shown)]:text-secondary-500 dark:text-secondary-500
                           max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ maxWidth: 'calc(100% - 2rem)' }}
            >{
                form.name
            }</label>
        </div>
    )
}
