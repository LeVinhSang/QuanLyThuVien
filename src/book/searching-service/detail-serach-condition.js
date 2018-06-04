class DetailSearchCondition {

    /**
     *
     * @param {int} id
     */
    constructor(id) {
        this.id = id;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'books.deleted_at': null, id_book: this.id});
    }
}

module.exports = DetailSearchCondition;
