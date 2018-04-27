module.exports = function (app) {
    let connection = require('knex')(app.get('config').database);
    app.set('databaseConnection', connection);
};