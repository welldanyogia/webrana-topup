import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 dark:border-indigo-600 text-primary-900 dark:text-primary-dark-100 focus:border-indigo-700 '
                    : 'border-transparent text-primary-500 dark:text-primary-dark-400 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-dark-700 focus:text-primary-700 dark:focus:text-primary-dark-300 focus:border-primary-300 dark:focus:border-primary-dark-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
