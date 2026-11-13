import { defaultBooks } from './js/data.js';
import { renderBooks } from './js/render.js';
import { filterBooks, initFilters } from './js/filters.js';
import { initMenu } from './js/menu.js';
import { initAddBookForm } from './js/form.js';
import { loadBooks, saveBooks } from './js/storage.js';
import { initTheme } from './js/theme.js';

const booksList = document.querySelector('#books-list');
const emptyMessage = document.querySelector('#books-empty');
const countElement = document.querySelector('#books-count');

let books = loadBooks(defaultBooks);

function update() {
    const visibleBooks = filterBooks(books, getFilters());
    renderBooks(visibleBooks, booksList);
    emptyMessage.hidden = visibleBooks.length > 0;
    countElement.textContent = `Showing ${visibleBooks.length} of ${books.length} books`;
}

function addBook(book) {
    books = [book, ...books];
    saveBooks(books);
    update();
}

initMenu();
initTheme();
initAddBookForm(addBook);
const getFilters = initFilters(update);
update();