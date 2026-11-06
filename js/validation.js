import { CATEGORIES } from './data.js';

const IMAGE_PATTERN = /^(https?:\/\/|img\/)\S+$/i;

export function validateBook(values) {
    const errors = {};

    const title = values.title.trim();
    if (!title) {
        errors.title = 'Please enter a title.';
    } else if (title.length < 2) {
        errors.title = 'The title must be at least 2 characters long.';
    } else if (title.length > 80) {
        errors.title = 'The title must be 80 characters or fewer.';
    }

    const author = values.author.trim();
    if (!author) {
        errors.author = 'Please enter the author.';
    } else if (author.length < 2) {
        errors.author = 'The author name must be at least 2 characters long.';
    }

    const priceText = values.price.trim();
    if (!priceText) {
        errors.price = 'Please enter a valid price.';
    } else {
        const price = Number(priceText);
        if (Number.isNaN(price)) {
            errors.price = 'The price must be a number.';
        } else if (price <= 0) {
            errors.price = 'The price must be greater than 0.';
        } else if (price > 1000) {
            errors.price = 'The price must not exceed $1000.';
        }
    }

    if (!CATEGORIES.includes(values.category)) {
        errors.category = 'Please choose a category.';
    }

    const image = values.image.trim();
    if (image && !IMAGE_PATTERN.test(image)) {
        errors.image = 'Use a link starting with http:// or https://, or a path like img/cover.jpg.';
    }

    const description = values.description.trim();
    if (!description) {
        errors.description = 'Please enter a description.';
    } else if (description.length < 10) {
        errors.description = 'The description must be at least 10 characters long.';
    } else if (description.length > 300) {
        errors.description = 'The description must be 300 characters or fewer.';
    }

    return errors;
}