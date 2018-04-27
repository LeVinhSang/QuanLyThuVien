class AdvanceSearchCondition {

    /**
     *
     * @param {string} title
     * @param {string} name_user_feedback
     */
    constructor(name_user_feedback, title) {
        this.name_user_feedback = name_user_feedback;
        this.title = title;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Feedback[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where( {name_user_feedback: this.name_user_feedback, title: this.title});
    }
}

module.exports = AdvanceSearchCondition;
