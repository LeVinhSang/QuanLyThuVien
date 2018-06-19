require('dotenv').config();

let transporter = require('./config-mail');

class MailSender {

    constructor (app) {
        this.app = app;
    }

    send () {
        let provide = this.app.get('borrower.provide');
        let repo    = this.app.get('borrower.repo');
        return provide.provideSendMail().then(value => {
            for ( let i = 0; i < value.length; i++ ) {
                let mainOptions = {
                    from   : process.env.DB_EMAIL,
                    to     : value[ i ].email,
                    subject: 'Thông Báo Trả Sách',
                    text   : value[ i ].email,
                    html   : '<p>Dear: ' + value[ i ].name_user + '</p>' +
                    '<p>Bạn đã hết thời gian mượn sách ở thư viện, bạn vui lòng tới thư viện để trả sách</p>' +
                    '<p>Xin cám ơn !</p>'
                };
                transporter.sendMail(mainOptions, function () {
                    return repo.updateSent(value[ i ].id).then()
                });
            }
        });

    }
}

module.exports = MailSender;