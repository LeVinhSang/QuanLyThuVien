module.exports = (req, res, next) => {
    if(req.body.title) {
        res.send('title must not null');
    }

    if(!req.body.author) {
        console.log('author must not null');
    }

    next();
};