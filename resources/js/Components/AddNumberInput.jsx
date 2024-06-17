export default function AddNumberInput({form}){
    return(
        <div>
            <div className="max-w-sm">
                <label htmlFor={`input-text-${form.id}`} className="block text-sm font-medium mb-2 dark:text-white">{form.name}</label>
                <input type="text" id={`input-text-${form.id}`} className="py-3 px-4 block w-full border-primary-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder={`${form.name}`}/>
            </div>
        </div>
    )
}
