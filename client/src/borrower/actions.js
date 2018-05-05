export const ADD_BORROWER = 'ADD_BORROWER';


export function addBorrower(borrower) {
    return {
        type: ADD_BORROWER,
        id: borrower.id,
        user: borrower.user,
        book: borrower.book,
        dateReturn: borrower.date_return
    }
}