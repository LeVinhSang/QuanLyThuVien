const connection       = require('../../../database');
const BorrowerFactory      = require('../borrower-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {BorrowerFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param  condition
     * @return {Borrower[]}
     */
    search(condition) {
        let factory = this.factory;
        let sqlQuery = this.connection('borrowers')
            .select('borrowers.id', 'borrowers.name_user', 'borrowers.book_id', 'borrowers.date_borrow',
                'borrowers.date_return',
                'users.user_name', 'users.email', 'users.avatar',
                'books.title', 'books.author', 'books.images', 'books.amount', 'books.publisher_id',
                'books.genre',
                'publishers.name', 'publishers.phone', 'publishers.address')
            .leftJoin('books', function () {
                this.on('borrowers.book_id', '=', 'books.id')
            })
            .leftJoin('users', function () {
                this.on('users.user_name', '=', 'borrowers.name_user')
            })
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            });

        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
