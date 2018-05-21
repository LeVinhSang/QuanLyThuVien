import {ADD_USER, LOGIN, SEND_CODE} from "./actions";

export function userReducer(state = [], action) {
    if(action.type === SEND_CODE) {
        return [...state]
    }

    if(action.type === ADD_USER) {
        return [...state, {...action.user}]
    }

    if(action.type === LOGIN) {
        return [...state]
    }

    return state
}