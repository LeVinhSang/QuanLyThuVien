class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'topics.deleted_at': null});
    }
}

module.exports = UndeletedSearchCondition;
