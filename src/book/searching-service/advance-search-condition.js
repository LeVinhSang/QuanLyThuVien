class AdvanceSearchCondition {

    /**
     *
     * @param {string} title
     * @param {string} publisher
     */
    constructor(title, publisher) {
        this.title = title;
        this.publisher = publisher;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({deleted_at: null, 'publishers.name': this.publisher, title: this.title});
    }
}

module.exports = AdvanceSearchCondition;
