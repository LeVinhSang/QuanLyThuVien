export const SEND_CODE = 'SEND_CODE';
export const ADD_USER  = 'ADD_USER';
export const LOGIN     = 'LOGIN';

export function sendCode(email, code) {
    return {
        type: SEND_CODE,
        email: email,
        code: code
    }
}

export function addUser(user_name, password, email, avatar) {
    return {
        type: ADD_USER,
        user_name: user_name,
        password: password,
        email: email,
        avatar: avatar
    }
}

export function login(user_name, password) {
    return {
        type: LOGIN,
        user_name: user_name,
        password: password
    }
}
