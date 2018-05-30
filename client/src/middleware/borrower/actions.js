export const ADD_BORROWER         = 'ADD_BORROWER';
export const ADD_BORROWER_USER    = 'ADD_BORROWER_USER';
export const LOAD_BORROWER        = 'LOAD_BORROWER';
export const EDIT_CHECKED         = 'EDIT_CHECKED';
export const EDIT_BORROWER        = 'EDIT_BORROWER';
export const DELETE_BORROWER      = 'DELETED_BORROWER';
export const GET_KEYWORD_BORROWER = 'GET_KEYWORD_BORROWER';
export const LOAD_BORROWER_ADMIN  = 'LOAD_BORROWER_ADMIN';
export const CONFIRM_BORROWER     = 'CONFIRM_BORROWER';

export function addBorrower(name_user, book_id, date_return) {
    return {
        type       : ADD_BORROWER,
        name_user  : name_user,
        book_id    : book_id,
        date_return: date_return
    }
}

export function addBorrowerUser(name_user, book_id, date_return) {
    return {
        type       : ADD_BORROWER_USER,
        name_user  : name_user,
        book_id    : book_id,
        date_return: date_return
    }
}

export function loadBorrower() {
    return {type: LOAD_BORROWER}
}

export function loadBorrowerAdmin() {
    return {type: LOAD_BORROWER_ADMIN}
}

export function editChecked(id, checked) {
    return {
        type   : EDIT_CHECKED,
        id     : id,
        checked: checked
    }
}

export function editBorrower(name_user, book_id, date_return, id, key) {
    return {
        type       : EDIT_BORROWER,
        name_user  : name_user,
        book_id    : book_id,
        date_return: date_return,
        id         : id,
        key        : key
    }
}

export function deleteBorrower(borrowers) {
    return {
        type     : DELETE_BORROWER,
        borrowers: borrowers
    }
}

export function getKeyWordBorrower(keyword) {
    return {
        type   : GET_KEYWORD_BORROWER,
        keyword: keyword
    }
}

export function confirmBorrower(id, index) {
    return {
        type     : CONFIRM_BORROWER,
        id       : id,
        index    : index
    }
}