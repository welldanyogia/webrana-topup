import React from 'react';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index !== 0 && (
                            <svg
                                className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-primary-400 dark:text-neutral-500"
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        )}
                        {item.href ? (
                            <Link href={item.href}
                                  className="text-sm font-medium text-primary-700 hover:text-primary-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="text-sm font-medium text-primary-500 dark:text-neutral-400">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
