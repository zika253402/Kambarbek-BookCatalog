import { CATEGORIES } from './data.js';

export function filterBooks(books, { query, category }) {
    const normalizedQuery = query.trim().toLowerCase();

    return books.filter((book) => {
        const matchesTitle = book.title.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === 'all' || book.category === category;
        return matchesTitle && matchesCategory;
    });
}

export function initFilters(onChange) {
    const searchInput = document.querySelector('#search');
    const categorySelect = document.querySelector('#category-filter');
    const filters = { query: '', category: 'all' };

    CATEGORIES.forEach((category) => {
        categorySelect.append(new Option(category, category));
    });

    searchInput.addEventListener('input', () => {
        filters.query = searchInput.value;
        onChange();
    });

    categorySelect.addEventListener('change', () => {
        filters.category = categorySelect.value;
        onChange();
    });

    return () => ({ ...filters });
}