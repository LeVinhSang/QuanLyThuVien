const BorrowerFactory    = require('./borrower-factory');
const BorrowerRepository = require('./borrower-repository');
const BorrowerProvider   = require('./borrower-provider');
const Searcher           = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('borrower.factory', new BorrowerFactory(app));
    app.set('borrower.repo', new BorrowerRepository(connection));
    app.set('borrower.provide', new BorrowerProvider(connection, new BorrowerFactory(app)));
    app.set('borrower.searcher', new Searcher(connection,new BorrowerFactory(app)));
};