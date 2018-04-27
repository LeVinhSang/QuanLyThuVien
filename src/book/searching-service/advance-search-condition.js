class AdvanceSearchCondition {

    /**
     *
     * @param {string} author
     * @param {string} publisher
     */
    constructor(author, publisher) {
        this.author = author;
        this.publisher = publisher;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({deleted_at: null, 'publishers.name': this.publisher, author: this.author});
    }
}

module.exports = AdvanceSearchCondition;
