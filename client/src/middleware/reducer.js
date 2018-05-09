import {ADD_BORROWER, EDIT_CHECKED, LOAD_BORROWER} from "./actions";

export function addToReducer(state = [], action) {
    if(action.type === ADD_BORROWER) {
        return [...state,{...action.borrower}]
    }

    if(action.type === LOAD_BORROWER) {
        return [...action.borrowers]
    }

    if(action.type === EDIT_CHECKED) {
        let borrower = [...action.borrower];
        borrower[action.id].checked = action.checked;
        return [...borrower];
    }

    return state;
}