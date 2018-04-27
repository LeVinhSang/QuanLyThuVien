const FeedbackRepo     = require('./feedback-repository');
const FeedbackFactory  = require('./feedback-factory');
const Searcher         = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('feedback.searcher', new Searcher(connection, new FeedbackFactory(app)));
    app.set('feedback.factory', new FeedbackFactory(app));
    app.set('feedback.repo', new FeedbackRepo(connection));
};