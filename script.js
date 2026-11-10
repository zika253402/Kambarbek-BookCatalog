import { defaultBooks } from './js/data.js';
import { renderBooks } from './js/render.js';
import { filterBooks, initFilters } from './js/filters.js';
import { initMenu } from './js/menu.js';
import { initAddBookForm } from './js/form.js';

const booksList = document.querySelector('#books-list');
const emptyMessage = document.querySelector('#books-empty');

let books = [...defaultBooks];

function update() {
    const visibleBooks = filterBooks(books, getFilters());
    renderBooks(visibleBooks, booksList);
    emptyMessage.hidden = visibleBooks.length > 0;
}

function addBook(book) {
    books = [book, ...books];
    update();
}

initMenu();
initAddBookForm(addBook);
const getFilters = initFilters(update);
update();