class OutDateSearchCondition {

    /**
     *
     * @param  sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where( function () {
            this.where('borrowers.date_return', '<', new Date())
        }).where({'borrowers.deleted_at': null});
    }
}

module.exports = OutDateSearchCondition;
