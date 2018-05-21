const EmailSender = require('./send-mail');
const EmailSenderCode = require('./send-code');

module.exports = (app) => {
    app.set('email.service', new EmailSender(app));
    app.set('code.service', new EmailSenderCode());
};