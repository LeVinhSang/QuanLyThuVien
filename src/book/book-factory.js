const Book = require('./book');

class BookFactory {

    constructor(app) {
        this.app = app;
    }

    /**
     *
     * @param bookRaw
     * @returns {Promise<Book>}
     */
    async makeFromRequest(bookRaw) {
        let publisherProvider = this.app.get('publisher.provide');
        let book = new Book(bookRaw.title);
        book.setId(bookRaw.id);
        book.setAmount(bookRaw.amount);
        book.setAuthor(bookRaw.author);
        book.setGenre(bookRaw.genre);
        book.setImages(bookRaw.images);
        let publisher = await publisherProvider.provide(bookRaw.publisher_id);
        book.setPublisher(publisher);
        return book;
    }

    /**
     *
     * @param bookRaw
     * @returns {Book}
     */
    makeFromDB(bookRaw) {
        let factory = this.app.get('publisher.factory');
        let book = new Book(bookRaw.title);
        book.setAuthor(bookRaw.author);
        book.setAmount(bookRaw.amount);
        book.setGenre(bookRaw.genre);
        book.setImages(bookRaw.images);
        let publisher = factory.makeFromDB(bookRaw);
        publisher.setId(bookRaw.publisher_id);
        book.setPublisher(publisher);
        book.setId(bookRaw.id);
        return book;

    }
}

module.exports = BookFactory;
