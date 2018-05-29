const status          = require('../status');

class KeywordSearchCondition {

    /**
     *
     * @param {string} keyword
     */
    constructor(keyword) {
        this.keyword = keyword;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery.where( function () {
            this.where('borrowers.name_user', 'like', '%' + keyword + '%')
                .orWhere('books.title', 'like', '%' + keyword + '%')
        }).where({'borrowers.deleted_at': null, 'borrowers.status': status.CONFIRM});
    }
}

module.exports = KeywordSearchCondition;
