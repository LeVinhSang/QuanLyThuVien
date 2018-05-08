class BorrowerProvider {

    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    provide() {
        let factory = this.factory;
        return this.connection('borrowers')
            .select('borrowers.id', 'borrowers.name_user', 'borrowers.book_id', 'borrowers.date_borrow',
                'borrowers.date_return',
                'users.user_name', 'users.email',
                'books.id_book', 'books.title', 'books.author', 'books.images', 'books.amount', 'books.publisher_id',
                'books.genre',
                'publishers.name', 'publishers.phone', 'publishers.address')
            .leftJoin('books', function () {
                this.on('borrowers.book_id', '=', 'books.id_book')
            })
            .leftJoin('users', function () {
                this.on('users.user_name', '=', 'borrowers.name_user')
            })
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            })
            .where( function () {
                this.where('borrowers.date_return', '<', new Date())
            }).where({'borrowers.deleted_at': null})
            .then( results => results.map(async element => factory.makeFromDB(element)));
    }
}

module.exports = BorrowerProvider;
