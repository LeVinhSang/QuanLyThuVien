class AdvanceSearchCondition {

    /**
     *
     * @param {string} user_name
     * @param {string} name
     */
    constructor(user_name, name) {
        this.name = name;
        this.user_name = user_name;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({deleted_at: null, 'borrowers.user_name': this.user_name, 'books.name': this.name});
    }
}

module.exports = AdvanceSearchCondition;
