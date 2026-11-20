import { BookCategory, type Book } from './types';

export const CATEGORIES: BookCategory[] = Object.values(BookCategory);

export const defaultBooks: Book[] = [
    {
        id: 1,
        title: 'The Song of Achilles',
        author: 'Madeline Miller',
        price: 14.99,
        category: BookCategory.Mythology,
        description: 'A retelling of the Iliad from the perspective of Patroclus, exploring his relationship with Achilles.',
        image: 'img/TheSongOfAchilles.jpg'
    },
    {
        id: 2,
        title: 'The Cruel Prince',
        author: 'Holly Black',
        price: 12.99,
        category: BookCategory.Fantasy,
        description: 'A young faerie girl must navigate the dangerous world of the Fae courts.',
        image: 'img/TheCruelPrince.jpg'
    },
    {
        id: 3,
        title: 'Shatter Me',
        author: 'Tahereh Mafi',
        price: 11.99,
        category: BookCategory.Dystopian,
        description: 'A young woman with the power to destroy the world is hunted by those who would use her power.',
        image: 'img/ShatterMe.jpg'
    }
];
