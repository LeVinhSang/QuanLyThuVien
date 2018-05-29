const status          = require('../status');

class AdvanceSearchCondition {

    /**
     *
     * @param {string} name_user
     * @param {string} title
     */
    constructor(name_user, title) {
        this.title = title;
        this.name_user = name_user;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({deleted_at: null, 'borrowers.name_user': this.name_user, 'books.title': this.title, 'borrowers.status': status.CONFIRM});
    }
}

module.exports = AdvanceSearchCondition;
