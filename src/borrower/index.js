const BorrowerFactory  = require('./borrower-factory');
const BorrowerProvider = require('./borrower-repository');
const Searcher         = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('borrower.factory', new BorrowerFactory(app));
    app.set('borrower.repo', new BorrowerProvider(connection));
    app.set('borrower.searcher', new Searcher(connection,new BorrowerFactory(app)));
};