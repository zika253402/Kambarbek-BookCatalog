export const BookCategory = {
    Mythology: 'Mythology',
    Fantasy: 'Fantasy',
    Dystopian: 'Dystopian',
    Romance: 'Romance',
    Mystery: 'Mystery'
} as const;

export type BookCategory = typeof BookCategory[keyof typeof BookCategory];
export type Theme = 'light' | 'dark';
export type CategoryFilter = BookCategory | 'all';

export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    category: BookCategory;
    description: string;
    image: string;
}

export interface BookFormValues {
    title: string;
    author: string;
    price: string;
    category: string;
    image: string;
    description: string;
}

export type ValidationErrors = Partial<Record<keyof BookFormValues, string>>;

export interface BookFilters {
    query: string;
    category: CategoryFilter;
}

export function isBookCategory(value: unknown): value is BookCategory {
    return typeof value === 'string' && Object.values(BookCategory).includes(value as BookCategory);
}

export function isTheme(value: unknown): value is Theme {
    return value === 'light' || value === 'dark';
}

export function isBook(value: unknown): value is Book {
    if (typeof value !== 'object' || value === null) return false;
    const book = value as Record<string, unknown>;
    return typeof book.id === 'number'
        && typeof book.title === 'string'
        && typeof book.author === 'string'
        && typeof book.price === 'number'
        && isBookCategory(book.category)
        && typeof book.description === 'string'
        && typeof book.image === 'string';
}

export function isBookArray(value: unknown): value is Book[] {
    return Array.isArray(value) && value.every(isBook);
}
