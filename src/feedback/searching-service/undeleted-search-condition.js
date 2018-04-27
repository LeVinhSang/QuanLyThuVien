class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Feedback[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'feedbacks.deleted_at': null});
    }
}

module.exports = UndeletedSearchCondition;
