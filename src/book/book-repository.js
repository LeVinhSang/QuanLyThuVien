class BookRepository {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Book} book
     * @returns {Promise <void> }
     */
    async add(book) {
        return await this.connection('books').insert({
            title: book.getTitle(),
            author: book.getAuthor(),
            publisher_id: book.getPublisher().getId() ? book.getPublisher().getId() : null,
            genre: book.getGenre(),
            amount: book.getAmount(),
            images: book.getImages()
        });
    }

    /**
     *
     * @param {Book} book
     * @returns {Promise <void> }
     */
    async edit(book) {
        return await this.connection('books').update({
            title: book.getTitle(),
            author: book.getAuthor(),
            publisher_id: book.getPublisher().getId() ? book.getPublisher().getId() : null,
            genre: book.getGenre(),
            amount: book.getAmount(),
            images: book.getImages()
        }).where({id_book: book.getId()});
    }

    /**
     *
     * @param {int} id
     * @returns {Promise <void> }
     */
    async delete(id) {
        return await this.connection('books').update({
            deleted_at: new Date()
        }).where({id_book: id})
    }
}

module.exports = BookRepository;

