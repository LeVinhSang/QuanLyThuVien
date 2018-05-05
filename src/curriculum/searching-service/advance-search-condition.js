class AdvanceSearchCondition {

    /**
     *
     * @param {string} author
     * @param {string} name
     */
    constructor(author, name) {
        this.name = name;
        this.author = author;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Curriculum[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where( {name: this.name, author: this.author});
    }
}

module.exports = AdvanceSearchCondition;
