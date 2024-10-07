import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        // './node_modules/preline/preline.js',
        './node_modules/preline/dist/*.js',
        "node_modules/flowbite/**/*.js",
    ],

    theme: {
        extend: {
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary' : colors.gray,
                'primary-dark' : colors.gray,
                // 'primary' : colors.blue,
                // 'primary-dark' : colors.blue,
                'secondary' : colors.blue,
                // 'blue': {
                //     '50': '#e8efff',
                //     '100': '#d5e1ff',
                //     '200': '#b3c7ff',
                //     '300': '#85a0ff',
                //     '400': '#566aff',
                //     '500': '#2f37ff',
                //     '600': '#1a0cff',
                //     '700': '#1100ff',
                //     '800': '#1006cd',
                //     '900': '#14109f',
                //     '950': '#0e0a5c',
                // },
                'blue': {
                    '50': '#eef7ff',
                    '100': '#daedff',
                    '200': '#bde0ff',
                    '300': '#8fceff',
                    '400': '#5bb1ff',
                    '500': '#358ffc',
                    '600': '#1e70f2',
                    '700': '#1658d9',
                    '800': '#1949b4',
                    '900': '#1a418e',
                    '950': '#152956',
                },
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                },
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            }
        },
    },

    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
        forms,
        require('preline/plugin'),
        require('daisyui'),
        require("tailwindcss-animate")
    ],
};
