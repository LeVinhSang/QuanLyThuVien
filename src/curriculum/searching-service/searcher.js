const connection        = require('../../../database');
const CurriculumFactory = require('../curriculum-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {CurriculumFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param  condition
     * @return {Borrower[]}
     */
    search(condition) {
        let factory = this.factory;
        let sqlQuery = this.connection('curriculums').select();
        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
