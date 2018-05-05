import {ADD_BORROWER} from "./actions";

export function getBorrower() {
    
}

export function addToReducer(state = [], action) {
    if(action.type === ADD_BORROWER) {
        return [...state,
                {
                    id: action.id,
                    user: action.user,
                    book: action.book,
                    dateReturn: action.dateReturn
                }];
    }

    return state;
}