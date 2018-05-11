export const LOAD_BOOK = 'LOAD_BOOK';
export const GET_KEYWORD_BOOK = 'GET_KEYWORD_BOOK';

export function loadBook() {
    return {type: LOAD_BOOK};
}

export function getKeyWordBook(keyword) {
    return {
        type: GET_KEYWORD_BOOK,
        keyword: keyword
    }
}