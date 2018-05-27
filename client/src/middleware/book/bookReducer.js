import { DELETE_BOOK, EDIT_CHECKED_BOOK, GET_KEYWORD_BOOK, LOAD_BOOK } from "./actions";

export function bookReducer(state = [], action) {
    if(action.type === LOAD_BOOK) {
        return [...action.books];
    }

    if(action.type === GET_KEYWORD_BOOK) {
        return [...action.books];
    }

    if(action.type === EDIT_CHECKED_BOOK) {
        let book = [...state];
        book[action.id].checked = action.checked;
        return [...book];
    }

    if(action.type === DELETE_BOOK) {
        return action.books.filter( book => !book.checked )
    }

    return state;
}