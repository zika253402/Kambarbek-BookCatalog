import type { Book } from './types';

function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className = '',
    text?: string
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}

function createCover(book: Book): HTMLImageElement | HTMLDivElement {
    if (book.image) {
        const image = createElement('img', 'card-image');
        image.src = book.image;
        image.alt = `${book.title} cover`;
        return image;
    }

    const placeholder = createElement('div', 'card-image card-image-placeholder', '📖');
    placeholder.setAttribute('aria-hidden', 'true');
    return placeholder;
}

export function createBookCard(book: Book): HTMLElement {
    const card = createElement('article', 'card');
    const button = createElement('button', 'card-button', 'Add to Cart');
    button.type = 'button';

    card.append(
        createCover(book),
        createElement('p', 'card-category', book.category),
        createElement('h3', 'card-title', book.title),
        createElement('p', 'card-author', `by ${book.author}`),
        createElement('p', 'card-description', book.description),
        createElement('p', 'card-price', formatPrice(book.price)),
        button
    );
    return card;
}

export function renderBooks(books: Book[], container: HTMLElement): void {
    container.replaceChildren(...books.map(createBookCard));
}
