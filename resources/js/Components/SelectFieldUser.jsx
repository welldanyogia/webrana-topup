export default function SelectFieldUser({form,handleChange,options}){
    return (
        <div className='relative'>
            {/*<!-- Select */}
            <select data-hs-select={`{
                              "placeholder": "${form.name}",
                              "toggleTag": "<button type=\\"button\\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-primary border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-primary-dark-900 dark:border-primary-dark-900 dark:text-secondary",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-900 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-secondary-400 dark:border-secondary-700",
                              "optionClasses": "py-2 px-4 w-full text-sm dark:text-secondary cursor-pointer hover:bg-primary-100 rounded-lg focus:outline-none focus:bg-primary-100 dark:bg-primary-dark-900 dark:hover:bg-primary-dark-800 dark:text-secondary dark:focus:bg-primary-dark-800",
                              "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>",
                              "extraMarkup": "<div class=\\"absolute top-1/2 end-3 -translate-y-1/2\\"><svg class=\\"flex-shrink-0 size-3.5 text-gray-500 dark:text-secondary\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m7 15 5 5 5-5\\"/><path d=\\"m7 9 5-5 5 5\\"/></svg></div>"
                            }`} className="hidden" onChange={handleChange} >
                <option value="">{form.name}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.name}</option>
                ))}
            </select>
            {/*<!-- End Select */}
        </div>
    )
}
