require('dotenv').config();

module.exports = {
    services:[
        require('./http'),
        require('./database'),
        require('./src/book'),
        require('./src/publisher'),
        require('./src/user'),
        require('./src/borrower'),
        require('./src/curriculum'),
        require('./src/topic'),
        require('./src/feedback'),
        require('./src/service')
    ],

    database : {
        client: 'mysql',
        connection: {
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_DATA,
        }
    },

    http : {
        port: process.env.HTTP_PORT || 8080
    }

};