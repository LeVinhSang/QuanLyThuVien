class AdvanceSearchCondition {

    /**
     *
     * @param {string} title
     * @param {string} name_user
     */
    constructor(name_user, title) {
        this.name_user = name_user;
        this.title = title;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Topic[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where( {'topics.name_user': this.name_user, title: this.title});
    }
}

module.exports = AdvanceSearchCondition;
