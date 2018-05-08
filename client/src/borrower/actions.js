export const ADD_BORROWER = 'ADD_BORROWER';
export const EDIT_BORROWER = 'EDIT_BORROWER';
export const CLEAR_BORROWER = 'CLEAR_BORROWER';
export const CHECKED_BORROWER = 'CHECKED_BORROWER';

export function addBorrower(borrower, checked) {
    return {
        type: ADD_BORROWER,
        id: borrower.id,
        user: borrower.user,
        book: borrower.book,
        checked: checked,
        date_return: borrower.date_return,
        date_borrow: borrower.date_borrow,
    }
}

export function editBorrower(borrower, key, checked) {
    return {
        type: EDIT_BORROWER,
        id: borrower.id,
        key: key,
        user: borrower.user,
        book: borrower.book,
        checked: checked,
        date_return: borrower.date_return,
        date_borrow: borrower.date_borrow
    }
}

export function deleteBorrower() {
    return {type: CLEAR_BORROWER}
}

export function checkedBorrower(id, checked) {
    return {type: CHECKED_BORROWER, id:id, checked: checked}
}