const EmailSender = require('./send-mail');

module.exports = (app) => {
    app.set('email.service', new EmailSender(app));
};