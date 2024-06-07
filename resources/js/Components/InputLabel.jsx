export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-primary-700 dark:text-primary-300 ` + className}>
            {value ? value : children}
        </label>
    );
}
