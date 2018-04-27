class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null})
    }
}

module.exports = UndeletedSearchCondition;
