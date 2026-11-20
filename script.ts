import { defaultBooks } from './js/data';
import { renderBooks } from './js/render';
import { filterBooks, initFilters } from './js/filters';
import { initMenu } from './js/menu';
import { initAddBookForm } from './js/form';
import { loadBooks, saveBooks } from './js/storage';
import { initTheme } from './js/theme';
import type { Book, BookFilters } from './js/types';

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Required element not found: ${selector}`);
    return element;
}

const booksList = getElement<HTMLElement>('#books-list');
const emptyMessage = getElement<HTMLElement>('#books-empty');
const countElement = getElement<HTMLElement>('#books-count');

let books: Book[] = loadBooks(defaultBooks);
let getFilters: () => BookFilters;

function update(): void {
    const visibleBooks = filterBooks(books, getFilters());
    renderBooks(visibleBooks, booksList);
    emptyMessage.hidden = visibleBooks.length > 0;
    countElement.textContent = `Showing ${visibleBooks.length} of ${books.length} books`;
}

function addBook(book: Book): void {
    books = [book, ...books];
    saveBooks(books);
    update();
}

initMenu();
initTheme();
initAddBookForm(addBook);
getFilters = initFilters(update);
update();
