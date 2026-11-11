import { loadTheme, saveTheme } from './storage.js';

function getInitialTheme() {
    const saved = loadTheme();
    if (saved) {
        return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initTheme() {
    const toggle = document.querySelector('#theme-toggle');
    const root = document.documentElement;

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.dataset.theme = theme;
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    applyTheme(getInitialTheme());

    toggle.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
}