import {ADD_USER, LOGIN, SEND_CODE, SIGN_UP} from "./actions";

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

    if(action.type === SIGN_UP) {
        return [...state];
    }

    return state
}