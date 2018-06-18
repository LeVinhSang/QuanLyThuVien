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
        let amount = await this.connection('books').select('amount').where({id_book: borrower.getBook().getId()});
        let book = this.connection('books').update({
            amount: amount[0].amount -1
        }).where({id_book: borrower.getBook().getId()});

        return await this.connection('borrowers').insert({
            name_user: borrower.getUser().getUser_name(),
            book_id: borrower.getBook().getId(),
            date_borrow: borrower.getDate_borrow(),
            receiving_status: borrower.getRecevingStatus(),
            status: status.PENDING,
            date_return: borrower.getDate_return()
        }).then( () => {
            return book;
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
            receiving_status: borrower.getRecevingStatus()
        }).where({id: borrower.getId()});
    }

    /**
     *
     * @param {int} id
     * @param {int} id_book
     * @returns {Promise <void> }
     */
    async delete(id, id_book) {

        let amount = await this.connection('books').select('amount').where({id_book: id_book});
        let book = this.connection('books').update({
            amount: amount[0].amount + 1
        }).where({id_book: id_book});
        return await this.connection('borrowers').update({
            deleted_at: new Date()
        }).where({id : id}).then( () => {
            return book;
        });
    }

    async updateStatus(id) {
        let date = new Date();
        let date_return = new Date();
        date.setMonth(date.getMonth() + 1);
        date_return.setMonth(date_return.getMonth() + 2);
        return await this.connection('borrowers').update({
            status: status.CONFIRM,
            date_borrow: date.getFullYear() + '/' + date.getMonth() + '/'+ date.getDate(),
            date_return: date_return.getFullYear() + '/' + date_return.getMonth() + '/'+ date_return.getDate(),
        }).where({id : id});
    }


    async updateReceivingStatus(id) {
        let date = new Date();
        date.setMonth(date.getMonth() + 1);
        return await this.connection('borrowers').update({
            receiving_status: date.getFullYear() + '/' + date.getMonth() + '/'+ date.getDate()
        }).where({id : id});
    }
}

module.exports = BorrowerRepository;
