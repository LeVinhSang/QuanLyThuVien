require('dotenv').config();

let transporter = require('./config-mail');

class MailSenderCode {

    async sendCode(email, code) {
        let mainOptions = {
            from: process.env.DB_EMAIL,
            to: email,
            subject: 'Send Code Confirm',
            text: email,
            html: '<p>Code confirm for you: ' + code + '</p>'
        };
        transporter.sendMail(mainOptions, function(){
            return true;
        });

    }
}

module.exports = MailSenderCode;