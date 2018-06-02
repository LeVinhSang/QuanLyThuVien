class DetailSearchCondition {


    constructor(id) {
        this.id = id;
    }

    /**
     *
     * @param sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null, 'borrowers.id': this.id})
    }
}

module.exports = DetailSearchCondition;
