import {LOAD_BOOK} from "./actions";

export function bookReducer(state = [], action) {
    if(action.type === LOAD_BOOK) {
        return [...action.books];
    }

    return state;
}