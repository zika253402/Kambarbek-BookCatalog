import { CATEGORIES } from './data';
import type { Book, BookFilters, BookCategory } from './types';

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Required element not found: ${selector}`);
    return element;
}

export function filterBooks(books: Book[], { query, category }: BookFilters): Book[] {
    const normalizedQuery = query.trim().toLowerCase();
    return books.filter((book: Book): boolean => {
        const matchesTitle = book.title.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === 'all' || book.category === category;
        return matchesTitle && matchesCategory;
    });
}

export function initFilters(onChange: () => void): () => BookFilters {
    const searchInput = getElement<HTMLInputElement>('#search');
    const categorySelect = getElement<HTMLSelectElement>('#category-filter');
    const filters: BookFilters = { query: '', category: 'all' };

    CATEGORIES.forEach((category) => categorySelect.add(new Option(category, category)));

    searchInput.addEventListener('input', (): void => {
        filters.query = searchInput.value;
        onChange();
    });

    categorySelect.addEventListener('change', (): void => {
        const selectedCategory = categorySelect.value;
        filters.category = selectedCategory === 'all'
            ? 'all'
            : CATEGORIES.includes(selectedCategory as BookCategory)
                ? selectedCategory as BookCategory
                : 'all';
        onChange();
    });

    return (): BookFilters => ({ ...filters });
}
