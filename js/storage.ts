import type { Book, Theme } from './types';
import { isBookArray, isTheme } from './types';

const BOOKS_KEY = 'bookCatalog:books';
const THEME_KEY = 'bookCatalog:theme';

export function loadFromStorage<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
    try {
        const storedValue: string | null = localStorage.getItem(key);
        if (storedValue === null) return fallback;
        const parsedValue: unknown = JSON.parse(storedValue);
        return isValid(parsedValue) ? parsedValue : fallback;
    } catch {
        return fallback;
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage can be unavailable when the browser blocks local storage.
    }
}

export function loadBooks(fallback: Book[]): Book[] {
    return loadFromStorage<Book[]>(BOOKS_KEY, fallback, isBookArray);
}

export function saveBooks(books: Book[]): void {
    saveToStorage<Book[]>(BOOKS_KEY, books);
}

export function loadTheme(): Theme | null {
    return loadFromStorage<Theme | null>(THEME_KEY, null, (value): value is Theme | null => value === null || isTheme(value));
}

export function saveTheme(theme: Theme): void {
    saveToStorage<Theme>(THEME_KEY, theme);
}
