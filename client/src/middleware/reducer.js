import {ADD_BORROWER, DELETE_BORROWER, EDIT_BORROWER, EDIT_CHECKED, LOAD_BORROWER} from "./actions";

export function addToReducer(state = [], action) {
    if(action.type === ADD_BORROWER) {
        return [...state,{...action.borrower}]
    }

    if(action.type === LOAD_BORROWER) {
        return [...action.borrowers]
    }

    if(action.type === EDIT_CHECKED) {
        let borrower = [...state];
        borrower[action.id].checked = action.checked;
        return [...borrower];
    }

    if(action.type === EDIT_BORROWER) {
        let borrower = [...state];
        borrower[action.key] = action.borrower;
        return [...borrower];
    }

    if(action.type === DELETE_BORROWER) {
        return action.borrowers.filter( borrower => !borrower.checked )
    }

    return state;
}