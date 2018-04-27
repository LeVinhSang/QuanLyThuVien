const BookFactory  = require('./book-factory');
const BookRepo     = require('./book-repository');
const Searcher     = require('./searching-service/searcher');
const Bookprovider = require('./book-provider');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('book.factory', new BookFactory(app));
    app.set('book.repo', new BookRepo(connection));
    app.set('book.searcher', new Searcher(connection, new BookFactory(app)));
    app.set('book.provide', new Bookprovider(connection, new BookFactory(app)));
};