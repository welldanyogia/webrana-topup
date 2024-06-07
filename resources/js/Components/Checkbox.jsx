export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-primary-dark-900 border-primary-300 dark:border-primary-dark-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-primary-dark-800 ' +
                className
            }
        />
    );
}
