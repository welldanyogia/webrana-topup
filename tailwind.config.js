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
        './node_modules/preline/preline.js',
        "node_modules/flowbite/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary' : colors.blue,
                'primary-dark' : colors.blue,
                'secondary' : colors.cyan,
                'blue': {
                    '50': '#e8efff',
                    '100': '#d5e1ff',
                    '200': '#b3c7ff',
                    '300': '#85a0ff',
                    '400': '#566aff',
                    '500': '#2f37ff',
                    '600': '#1a0cff',
                    '700': '#1100ff',
                    '800': '#1006cd',
                    '900': '#14109f',
                    '950': '#0e0a5c',
                },


            },
        },
    },

    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
        forms,
        require('preline/plugin'),
        require('daisyui'),
    ],
};
