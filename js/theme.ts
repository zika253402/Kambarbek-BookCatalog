import { loadTheme, saveTheme } from './storage';
import type { Theme } from './types';

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Required element not found: ${selector}`);
    return element;
}

function getInitialTheme(): Theme {
    const savedTheme = loadTheme();
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initTheme(): void {
    const toggle = getElement<HTMLButtonElement>('#theme-toggle');
    const root = document.documentElement;

    function applyTheme(theme: Theme): void {
        const isDark = theme === 'dark';
        root.dataset.theme = theme;
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    applyTheme(getInitialTheme());
    toggle.addEventListener('click', (): void => {
        const nextTheme: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
}
