import {ADD_USER, SEND_CODE} from "./actions";

export function userReducer(state = [], action) {
    if(action.type === SEND_CODE) {
        return [...state]
    }

    if(action.type === ADD_USER) {
        return [...state, {...action.user}]
    }

    return state
}