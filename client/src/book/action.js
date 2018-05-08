export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_FOR_BORROWER = 'ADD_BOOK_FOR_BORROWER';
export const EDIT_BOOK = 'EDIT_BOOK';

export function addBook(book) {
    return {
        type: ADD_BOOK,
        id_book: book.id_book,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        genre: book.genre,
        amount: book.amount,
        images: book.images
    }
}

export function editBook(book) {
    return {
        type: EDIT_BOOK,
        id_book: book.id_book,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        genre: book.genre,
        amount: book.amount,
        images: book.images
    }
}