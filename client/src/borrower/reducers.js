import {ADD_BORROWER, CHECKED_BORROWER, CLEAR_BORROWER, EDIT_BORROWER} from "./actions";

export function addToReducer(state = [], action) {

    if(action.type === ADD_BORROWER) {
        return [...state, {
            id: action.id,
            user: action.user,
            book: action.book,
            checked: action.checked,
            date_return: action.date_return,
            date_borrow: action.date_borrow

        }];
    }

    if(action.type === EDIT_BORROWER) {
        let newBorrowers = [...state];
        newBorrowers[action.key].user = action.user;
        newBorrowers[action.key].book = action.book;
        newBorrowers[action.key].checked = action.checked;
        newBorrowers[action.key].date_return = action.date_return;

        return [...newBorrowers];
    }

    if(action.type === CLEAR_BORROWER) {
        return state.filter(borrower => {
            return !borrower.checked
        });
    }

    if(action.type === CHECKED_BORROWER) {
        let borrowers = [...state];
        borrowers[action.id].checked = action.checked;
        return [...borrowers];
    }

    if(action.type === CLEAR_BORROWER) {
        return state.filter(borrower => !borrower.checked);
    }

    return state;
}