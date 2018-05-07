export const ADD_BORROWER = 'ADD_BORROWER';
export const EDIT_BORROWER = 'EDIT_BORROWER';

export function addBorrower(borrower) {
    return {
        type: ADD_BORROWER,
        id: borrower.id,
        user: borrower.user,
        book: borrower.book,
        date_return: borrower.date_return,
        date_borrow: borrower.date_borrow
    }
}

export function editBorrower(borrower) {
    return {
        type: EDIT_BORROWER,
        id: borrower.id,
        user: borrower.user,
        book: borrower.book,
        date_return: borrower.date_return,
        date_borrow: borrower.date_borrow
    }
}