class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null, 'borrowers.status': 'confirm'})
    }
}

module.exports = UndeletedSearchCondition;
