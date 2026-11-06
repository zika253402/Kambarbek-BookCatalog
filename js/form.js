import { CATEGORIES } from './data.js';
import { validateBook } from './validation.js';

const FIELDS = ['title', 'author', 'price', 'category', 'image', 'description'];

export function initAddBookForm() {
    const form = document.querySelector('#add-book-form');

    CATEGORIES.forEach((category) => {
        form.elements.category.append(new Option(category, category));
    });

    function setError(name, message = '') {
        const input = form.elements[name];
        const errorElement = document.querySelector(`#book-${name}-error`);

        errorElement.textContent = message;
        input.classList.toggle('is-invalid', Boolean(message));
        input.setAttribute('aria-invalid', String(Boolean(message)));
    }

    function getValues() {
        return Object.fromEntries(FIELDS.map((name) => [name, form.elements[name].value]));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const values = getValues();
        const errors = validateBook(values);

        FIELDS.forEach((name) => setError(name, errors[name]));

        if (Object.keys(errors).length > 0) {
            form.querySelector('.is-invalid').focus();
            return;
        }

        console.log('Form is valid:', values);
    });

    form.addEventListener('input', (event) => {
        if (FIELDS.includes(event.target.name)) {
            setError(event.target.name);
        }
    });
}