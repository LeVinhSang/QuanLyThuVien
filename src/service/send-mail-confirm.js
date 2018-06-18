require('dotenv').config();

let transporter = require('./config-mail');

class MailSenderCode {

    async sendMailConfirm(email) {
        let mainOptions = {
            from: process.env.DB_EMAIL,
            to: email,
            subject: 'Send Code Confirm',
            text: email,
            html: '<p>Dear: "'+ email +'" <br/>' +
            'You have been agreed to borrow books. ' +
            'Please go to the library for books. ' +
            'If you do not pick up your book within 2 days,' +
            ' we will cancel your registration.<br/>' +
            'Thanks...!' +
            '</p>'
        };
        transporter.sendMail(mainOptions, function(){
            return true;
        });

    }
}

module.exports = MailSenderCode;