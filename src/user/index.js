const UserFactory  = require('./user-factory');
const UserRepo     = require('./user-repository');
const UserProvider = require('./user-provider');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('user.repo', new UserRepo(connection));
    app.set('user.factory', new UserFactory());
    app.set('user.provide', new UserProvider(connection, new UserFactory()));
};