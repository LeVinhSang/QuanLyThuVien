import {
    ADD_BORROWER, CONFIRM_BORROWER, DELETE_BORROWER, EDIT_BORROWER, EDIT_CHECKED, GET_KEYWORD_BORROWER,
    LOAD_BORROWER, LOAD_BORROWER_ADMIN
} from "./actions";

export function borrowerReducer(state = [], action) {
    if(action.type === ADD_BORROWER) {
        return [...state,{...action.borrower}]
    }

    if(action.type === LOAD_BORROWER) {
        return [...action.borrowers]
    }

    if(action.type === LOAD_BORROWER_ADMIN) {
        return [...action.borrowers]
    }

    if(action.type === CONFIRM_BORROWER) {
        let borrower = [...state];
        borrower[action.index].status = 'confirm';
        return [...borrower];
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

    if(action.type === GET_KEYWORD_BORROWER) {
        return [...action.borrowers]
    }

    return state;
}