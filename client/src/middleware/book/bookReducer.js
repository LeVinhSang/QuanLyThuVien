import {GET_KEYWORD_BOOK, LOAD_BOOK} from "./actions";

export function bookReducer(state = [], action) {
    if(action.type === LOAD_BOOK) {
        return [...action.books];
    }

    if(action.type === GET_KEYWORD_BOOK) {
        return [...action.books];
    }

    return state;
}