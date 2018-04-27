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
     * @return {Book[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery.where( function () {
            this.where('borrowers.user_name', 'like', '%' + keyword + '%')
                .orWhere('books.name', 'like', '%' + keyword + '%')
        }).where({'borrowers.deleted_at': null});
    }
}

module.exports = KeywordSearchCondition;
