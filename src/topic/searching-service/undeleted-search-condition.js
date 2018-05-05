class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Topic[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'topics.deleted_at': null});
    }
}

module.exports = UndeletedSearchCondition;
