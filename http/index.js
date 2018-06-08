const router     = require('./router/router');
const express    = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


module.exports = function (app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers","*");
        next();
    });

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(router);
    app.use(fileUpload());
};