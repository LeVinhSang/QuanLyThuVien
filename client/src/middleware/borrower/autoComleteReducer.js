import { LOAD_BORROWER} from "./actions";

export function autoCompleteReducer(state = [], action) {
    if(action.type === LOAD_BORROWER) {
        return [...action.borrowers]
    }

    return state;
}