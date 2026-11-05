import { defaultBooks } from './js/data.js';
import { renderBooks } from './js/render.js';
import { filterBooks, initFilters } from './js/filters.js';
import { initMenu } from './js/menu.js';

const booksList = document.querySelector('#books-list');
const emptyMessage = document.querySelector('#books-empty');

let books = [...defaultBooks];

function update() {
    const visibleBooks = filterBooks(books, getFilters());
    renderBooks(visibleBooks, booksList);
    emptyMessage.hidden = visibleBooks.length > 0;
}

initMenu();
const getFilters = initFilters(update);
update();