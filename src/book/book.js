class Book {

    /**
     *
     * @param {string} title
     */
    constructor(title) {
        this.title = title;
    }

    /**
     *
     * @returns {string|*}
     */
    getTitle() {
        return this.title;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @returns {int|*}
     */
    getId() {
        return this.id;
    }

    /**
     *
     * @param {string} author
     */
    setAuthor(author) {
        this.author = author;
    }

    /**
     *
     * @returns {string|*}
     */
    getAuthor() {
        return this.author;
    }

    /**
     *
     * @param {Publisher} publisher
     */
    setPublisher(publisher) {
        this.publisher = publisher;
    }

    /**
     *
     * @returns {Publisher|*}
     */
    getPublisher() {
        return this.publisher;
    }

    /**
     *
     * @param {string} genre
     */
    setGenre(genre) {
        this.genre = genre;
    }

    /**
     *
     * @returns {string|*}
     */
    getGenre() {
        return this.genre;
    }

    /**
     *
     * @param {int} amount
     */
    setAmount(amount) {
        this.amount = amount;
    }

    /**
     *
     * @returns {int|*}
     */
    getAmount() {
        return this.amount;
    }

    /**
     *
     * @param {string} images
     */
    setImages(images) {
        this.images = images;
    }

    /**
     *
     * @returns {string|*}
     */
    getImages() {
        return this.images;
    }

}

module.exports = Book;
