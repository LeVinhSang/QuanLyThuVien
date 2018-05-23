import {ADD_USER, CHANGE_PASS, CHECK_EMAIL, LOGIN, SEND_CODE, SIGN_UP} from "./actions";

export function userReducer(state = [], action) {
    if (action.type === SEND_CODE) {
        return [...state]
    }

    if (action.type === ADD_USER) {
        return [...state, {...action.user}]
    }

    if (action.type === LOGIN) {
        return [...state]
    }

    if (action.type === SIGN_UP) {
        return [...state];
    }

    if (action.type === CHANGE_PASS) {
        return [...state];
    }

    if(action.type === CHECK_EMAIL) {
        return [...state, {...action.users}];
    }

    return state
}