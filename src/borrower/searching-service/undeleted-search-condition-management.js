class UndeletedSearchConditionManagement {

    /**
     *
     * @param sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null})
    }
}

module.exports = UndeletedSearchConditionManagement;
