class Borrower {

    /**
     *
     * @param {User} user
     * @param {Book} book
     */
    constructor(user, book) {
        this.user = user;
        this.book = book;
    }

    /**
     *
     * @returns {User|*}
     */
    getUser() {
        return this.user;
    }

    /**
     *
     * @returns {Book|*}
     */
    getBook() {
        return this.book;
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
     * @param {string} date_borrow
     */
    setDate_borrow(date_borrow) {
        this.date_borrow = date_borrow;
    }

    /**
     *
     * @returns {string|*}
     */
    getDate_borrow() {
        return this.date_borrow;
    }

    /**
     *
     * @param {string} date_return
     */
    setDate_return(date_return) {
        this.date_return = date_return;
    }

    /**
     *
     * @returns {string|*}
     */
    getDate_return() {
        return this.date_return;
    }

    /**
     *
     * @param {string} status
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     *
     * @returns {string|*}
     */
    getStatus() {
        return this.status;
    }

}

module.exports = Borrower;
