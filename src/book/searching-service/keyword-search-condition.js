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
            this.where('books.title', 'like', '%' + keyword + '%')
                .orWhere('publishers.name', 'like', '%' + keyword + '%')
                .orWhere('genre', 'like', '%' + keyword + '%')
        }).where({'books.deleted_at': null});
    }
}

module.exports = KeywordSearchCondition;
