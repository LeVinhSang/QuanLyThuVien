const connection      = require('../../../database');
const FeedbackFactory = require('../feedback-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {FeedbackFactory} factory
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
        let sqlQuery = this.connection('feedbacks').select('feedbacks.name_user_feedback', 'feedbacks.comment',
            'feedbacks.topic_id',
            'topics.name_user', 'topics.content', 'topics.title',
            'topics.date_create', 'users.user_name', 'users.email')
            .leftJoin('topics', function () {
                this.on('feedbacks.topic_id', '=', 'topics.id')
            })
            .leftJoin('users', function () {
                this.on('users.user_name', '=', 'topics.name_user');
            });
        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
