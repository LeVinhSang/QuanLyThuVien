const status = require('./status');

class BorrowerRepository {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Borrower} borrower
     * @returns {Promise <void> }
     */
    async add(borrower) {
        return await this.connection('borrowers').insert({
            name_user: borrower.getUser().getUser_name(),
            book_id: borrower.getBook().getId(),
            date_borrow: new Date().toISOString().substr(0, 10),
            status: status.PENDING,
            date_return: borrower.getDate_return()
        });
    }

    /**
     *
     * @param {Borrower} borrower
     * @returns {Promise <void> }
     */
    async edit(borrower) {
        return await this.connection('borrowers').update({
            name_user: borrower.getUser().getUser_name(),
            book_id: borrower.getBook().getId(),
            date_borrow: borrower.getDate_borrow(),
            date_return: borrower.getDate_return(),
        }).where({id: borrower.getId()});
    }

    /**
     *
     * @param {int} id
     * @returns {Promise <void> }
     */
    async delete(id) {
        return await this.connection('borrowers').update({
            deleted_at: new Date()
        }).where({id : id});
    }

    async confirm(id) {
        return await this.connection('borrowers').update({
            status: status.CONFIRM
        }).where({id : id});
    }
}

module.exports = BorrowerRepository;
