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
     * @return {Feedback[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery.where( function () {
            this.where('topics.title', 'like', '%' + keyword + '%')
                .orWhere('feedbacks.name_user_feedback', 'like', '%' + keyword + '%')
        });
    }
}

module.exports = KeywordSearchCondition;
