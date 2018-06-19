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
    provide(id) {
        let factory = this.factory;
        return this.connection('books')
            .select('books.id_book', 'books.title', 'books.author', 'books.images', 'books.amount', 'books.publisher_id',
            'books.genre',
            'publishers.name', 'publishers.phone', 'publishers.address')
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            }).where({'books.id_book': id})
            .where('amount', '>', 0)
            .then( results => {
                if(results.length === 0 ){
                    return new Book('');
                }
                return factory.makeFromDB(results[0])
            });
    }

}

module.exports = BookProvider;
