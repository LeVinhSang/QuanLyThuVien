const Book = require('../book/book');

class BookProvider {

    /**
     *
     * @param connection
     * @param {BookFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param {int} id
     * @returns {Promise<*>}
     */
    async provide(id) {
        let factory = this.factory;
        let book = await this.connection('books')
            .select('books.id', 'books.title', 'books.author', 'books.images', 'books.amount', 'books.publisher_id',
            'books.genre',
            'publishers.name', 'publishers.phone', 'publishers.address')
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            }).where({'books.id': id})
            .where('amount', '>', 0)
            .then( results => factory.makeFromDB(results[0]));
        return book;
    }

}

module.exports = BookProvider;
