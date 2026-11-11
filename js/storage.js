const BOOKS_KEY = 'bookCatalog:books';

function read(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
}

function write(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
}

export function loadBooks(fallback) {
    const saved = read(BOOKS_KEY);
    return Array.isArray(saved) ? saved : fallback;
}

export function saveBooks(books) {
    write(BOOKS_KEY, books);
}