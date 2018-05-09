export const ADD_BORROWER = 'ADD_BORROWER';
export const LOAD_BORROWER = 'LOAD_BORROWER';
export const EDIT_CHECKED = 'EDIT_CHECKED';
export const EDIT_BORROWER = 'EDIT_BORROWER';

export function addBorrower(name_user, book_id, date_return) {
    return {
        type: ADD_BORROWER,
        name_user: name_user,
        book_id: book_id,
        date_return: date_return
    }
}

export function loadBorrower() {
    return {type: LOAD_BORROWER}
}

export function editChecked(id, checked) {
    return {
        type: EDIT_CHECKED,
        id: id,
        checked: checked
    }
}

export function editBorrower(name_user, book_id, date_return, id) {
    return {
        type: EDIT_BORROWER,
        name_user: name_user,
        book_id: book_id,
        date_return: date_return,
        id: id
    }
}