export const LOAD_BOOK         = 'LOAD_BOOK';
export const GET_KEYWORD_BOOK  = 'GET_KEYWORD_BOOK';
export const EDIT_CHECKED_BOOK = 'EDIT_CHECKED_BOOK';
export const DELETE_BOOK       = 'DELETE_BOOK';

export function loadBook() {
    return {type: LOAD_BOOK};
}

export function getKeyWordBook(keyword) {
    return {
        type   : GET_KEYWORD_BOOK,
        keyword: keyword
    }
}

export function editCheckedBook(id, checked) {
    return {
        type   : EDIT_CHECKED_BOOK,
        id     : id,
        checked: checked
    }
}

export function deleteBook(books) {
    return {
        type : DELETE_BOOK,
        books: books
    }
}