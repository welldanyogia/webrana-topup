import './bootstrap';
import '../css/app.css';
import 'preline';


import { render } from "react-dom";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {BrowserRouter, Router, useLocation} from 'react-router-dom';
import "preline/preline";
import {HSAccordion, HSDropdown, HSOverlay, HSSelect, HSStaticMethods, HSTooltip} from "preline";
import ApexCharts from 'apexcharts'
import ClipboardJS from "clipboard";

HSStaticMethods.autoInit();

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        HSStaticMethods.autoInit();
    }
});

(function() {
    window.addEventListener('load', () => {
        const $clipboards = document.querySelectorAll('.js-clipboard-example');
        $clipboards.forEach((el) => {
            const isToggleTooltip = HSStaticMethods.getClassProperty(el, '--is-toggle-tooltip') !== 'false';
            const clipboard = new ClipboardJS(el, {
                text: (trigger) => {
                    const clipboardText = trigger.dataset.clipboardText;

                    if (clipboardText) return clipboardText;

                    const clipboardTarget = trigger.dataset.clipboardTarget;
                    const $element = document.querySelector(clipboardTarget);

                    if (
                        $element.tagName === 'SELECT'
                        || $element.tagName === 'INPUT'
                        || $element.tagName === 'TEXTAREA'
                    ) return $element.value
                    else return $element.textContent;
                }
            });
            clipboard.on('success', () => {
                const $default = el.querySelector('.js-clipboard-default');
                const $success = el.querySelector('.js-clipboard-success');
                const $successText = el.querySelector('.js-clipboard-success-text');
                const successText = el.dataset.clipboardSuccessText || '';
                const tooltip = el.closest('.hs-tooltip');
                const $tooltip = HSTooltip.getInstance(tooltip, true);
                let oldSuccessText;

                if ($successText) {
                    oldSuccessText = $successText.textContent
                    $successText.textContent = successText
                }
                if ($default && $success) {
                    $default.style.display = 'none'
                    $success.style.display = 'block'
                }
                if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
                if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();

                setTimeout(function () {
                    if ($successText && oldSuccessText) $successText.textContent = oldSuccessText;
                    if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
                    if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
                    if ($default && $success) {
                        $success.style.display = '';
                        $default.style.display = '';
                    }
                }, 800);
            });
        });
    })
})()

const html = document.querySelector('html');
const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true,
});

const appName = import.meta.env.APP_NAME || 'Webrana';


createInertiaApp({
    title: (title) => `${title} - ${appName} | Topup Game Terpercaya`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`,  import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#a3e635',
    },
});


