import {ADD_BOOK, EDIT_BOOK} from "./action";
import getBook from "./getBook";

export async function addToReducer(state = [], action) {

    state = await getBook().then(values => values);

    if(action.type === ADD_BOOK) {
        return state;
    }

    if(action.type === EDIT_BOOK) {
        return state;
    }

    return state;
}