import { defaultBooks } from './js/data.js';
import { renderBooks } from './js/render.js';
import { initMenu } from './js/menu.js';

const booksList = document.querySelector('#books-list');

initMenu();
renderBooks(defaultBooks, booksList);