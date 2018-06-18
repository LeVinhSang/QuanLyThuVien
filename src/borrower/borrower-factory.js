const Borrower = require('./borrower');

class BorrowerFactory {

    constructor(app) {
        this.app = app;
    }

    /**
     *
     * @param {Borrower} borrowerRaw
     * @returns {Promise<Borrower>}
     */
    async makeFromRequest(borrowerRaw) {
        let bookProvider = this.app.get('book.provide');
        let userProvider = this.app.get('user.provide');
        let book = await bookProvider.provide(borrowerRaw.book_id);
        let user = await userProvider.provide(borrowerRaw.name_user);
        let borrower = new Borrower(user, book);
        borrower.setDate_return(borrowerRaw.date_return);
        borrower.setDate_borrow(borrowerRaw.date_borrow);
        borrower.setStatus(borrowerRaw.status);
        borrower.setReceivingStatus(borrowerRaw.receiving_status);
        borrower.setId(borrowerRaw.id);
        return borrower;
    }

    /**
     *
     * @param borrowerRaw
     * @returns {Borrower}
     */
    makeFromDB(borrowerRaw) {
        let app = this.app;
        let userFactory = app.get('user.factory');
        let bookFactory = app.get('book.factory');
        let user = userFactory.makeFromDB(borrowerRaw);
        let book = bookFactory.makeFromDB(borrowerRaw);
        let borrower = new Borrower(user, book);
        borrower.setId(borrowerRaw.id);
        borrower.setDate_borrow(borrowerRaw.date_borrow);
        borrower.setStatus(borrowerRaw.status);
        borrower.setDate_return(borrowerRaw.date_return);
        borrower.setReceivingStatus(borrowerRaw.receiving_status);
        return borrower;

    }
}

module.exports = BorrowerFactory;
