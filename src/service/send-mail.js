require('dotenv').config();

let transporter = require('./config-mail');

class MailSender {

    constructor(app) {
        this.app = app;
    }

    send() {
        let provide = this.app.get('borrower.provide');

        return provide.provide().then( value => {
            for(let i =0; i< value.length; i++) {
                let mainOptions = {
                    from: process.env.DB_EMAIL,
                    to: value[i].user.email,
                    subject: 'Thông Báo Trả Sách',
                    text: value[i].user.email,
                    html: '<p>Dear: ' + value[i].user.user_name + '</p>'+
                    '<p>Bạn đã hết thời gian mượn sách ở thư viện, bạn vui lòng tới thư viện để trả sách</p>'+
                    '<p>Xin cám ơn !</p>'
                };
                transporter.sendMail(mainOptions, function(){
                    return true;
                });
            }
        });

    }
}

module.exports = MailSender;