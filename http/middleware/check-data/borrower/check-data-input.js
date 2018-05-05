module.exports = (req, res, next) => {
    if(!req.body.date_return) {
        return res.send('date return must not null');
    }

    if(Date.parse(req.body.date_return) < new Date()) {
        return res.send('date return must > today');
    }

    next();
};