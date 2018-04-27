const TopicFactory    = require('./topic-factory');
const TopicRepository = require('./topic-repository');
const Searcher        = require('./searching-service/searcher');
const TopicProvider   = require('./topic-provider');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('topic.factory', new TopicFactory(app));
    app.set('topic.repo', new TopicRepository(connection));
    app.set('topic.searcher', new Searcher(connection, new TopicFactory(app)));
    app.set('topic.provide', new TopicProvider(connection, new TopicFactory(app)));
};