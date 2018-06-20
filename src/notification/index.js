const Notification        = require('./notification-repository');
const NotificationProvide = require('./notification-provider');

module.exports = app => {
    let connection = app.get('databaseConnection');
    app.set('notification', new Notification(connection));
    app.set('notification-provide', new NotificationProvide(connection));
};