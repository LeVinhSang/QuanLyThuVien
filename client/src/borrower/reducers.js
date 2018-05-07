import {ADD_BORROWER, EDIT_BORROWER} from "./actions";
import getBorrower from "./getBorrower";

export async function addToReducer(state = [], action) {

    state = await getBorrower().then(values => values);

    if(action.type === ADD_BORROWER) {
        return state;
    }

    if(action.type === EDIT_BORROWER) {
        return state;
    }

    return state;
}