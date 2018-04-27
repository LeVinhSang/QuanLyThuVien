const connection   = require('../../../database');
const TopicFactory = require('../topic-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {TopicFactory} factory
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
        let sqlQuery = this.connection('topics').select('topics.name_user', 'topics.content', 'topics.title',
            'topics.date_create', 'users.user_name', 'users.email')
            .leftJoin('users', function () {
                this.on('users.user_name', '=', 'topics.name_user');
            });
        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
