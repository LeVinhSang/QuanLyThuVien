const status          = require('../status');

class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null, 'borrowers.status': status.CONFIRM})
    }
}

module.exports = UndeletedSearchCondition;
