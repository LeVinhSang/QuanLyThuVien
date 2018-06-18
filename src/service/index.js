const EmailSender        = require('./send-mail');
const EmailSenderCode    = require('./send-code');
const EmailSenderConfirm = require('./send-mail-confirm');

module.exports = (app) => {
    app.set('email.service', new EmailSender(app));
    app.set('code.service', new EmailSenderCode());
    app.set('confirm.service', new EmailSenderConfirm());
};