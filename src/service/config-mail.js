let nodemailer =  require('nodemailer');

let transporter =  nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.DB_EMAIL,
        pass: process.env.DB_PASS_EMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;