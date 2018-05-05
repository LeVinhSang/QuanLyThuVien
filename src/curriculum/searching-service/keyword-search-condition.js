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
     * @return {Curriculum[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery.where( function () {
            this.where('name', 'like', '%' + keyword + '%')
                .orWhere('author', 'like', '%' + keyword + '%')
        });
    }
}

module.exports = KeywordSearchCondition;
