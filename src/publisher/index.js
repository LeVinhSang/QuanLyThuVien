const PublisherProvider = require('./publisher-provider');
const PublisherFactory  = require('./publisher-factory');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('publisher.factory', new PublisherFactory());
    app.set('publisher.provide', new PublisherProvider(connection, new PublisherFactory()));
};