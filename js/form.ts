import { CATEGORIES } from './data';
import { validateBook } from './validation';
import type { Book, BookCategory, BookFormValues, ValidationErrors } from './types';
import { isBookCategory } from './types';

const FIELDS: (keyof BookFormValues)[] = ['title', 'author', 'price', 'category', 'image', 'description'];

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Required element not found: ${selector}`);
    return element;
}

function getInput(name: keyof BookFormValues): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
    const element = document.getElementById(`book-${name}`);
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
        throw new Error(`Required form field not found: book-${name}`);
    }
    return element;
}

export function initAddBookForm(onAdd: (book: Book) => void): void {
    const form = getElement<HTMLFormElement>('#add-book-form');
    const successMessage = getElement<HTMLElement>('#add-book-success');
    const categorySelect = getElement<HTMLSelectElement>('#book-category');

    CATEGORIES.forEach((category: BookCategory) => categorySelect.add(new Option(category, category)));

    function setError(name: keyof BookFormValues, message = ''): void {
        const input = getInput(name);
        const errorElement = getElement<HTMLElement>(`#book-${name}-error`);
        errorElement.textContent = message;
        input.classList.toggle('is-invalid', Boolean(message));
        input.setAttribute('aria-invalid', String(Boolean(message)));
    }

    function getValues(): BookFormValues {
        return {
            title: getInput('title').value,
            author: getInput('author').value,
            price: getInput('price').value,
            category: getInput('category').value,
            image: getInput('image').value,
            description: getInput('description').value
        };
    }

    form.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();
        successMessage.hidden = true;

        const values = getValues();
        const errors: ValidationErrors = validateBook(values);
        FIELDS.forEach((name) => setError(name, errors[name]));

        if (Object.keys(errors).length > 0) {
            form.querySelector<HTMLElement>('.is-invalid')?.focus();
            return;
        }

        if (!isBookCategory(values.category)) return;

        const newBook: Book = {
            id: Date.now(),
            title: values.title.trim(),
            author: values.author.trim(),
            price: Number(values.price),
            category: values.category,
            image: values.image.trim(),
            description: values.description.trim()
        };

        onAdd(newBook);
        form.reset();
        successMessage.hidden = false;
    });

    form.addEventListener('input', (event: Event): void => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
        const fieldName = target.name;
        if (FIELDS.includes(fieldName as keyof BookFormValues)) {
            setError(fieldName as keyof BookFormValues);
            successMessage.hidden = true;
        }
    });
}
