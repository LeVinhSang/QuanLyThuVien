import {ADD_BORROWER} from "./actions";

export function addToReducer(state = [], action) {
    if(action.type === ADD_BORROWER) {
        console.log([...state,
            {
                id: action.id,
                user: action.user,
                book: action.book,
                date_return: action.date_return,
                date_borrow: action.date_borrow
            }]);
        return [...state,
                {
                    id: action.id,
                    user: action.user,
                    book: action.book,
                    date_return: action.date_return,
                    date_borrow: action.date_borrow
                }];
    }

    return state;
}