module.exports = (req, res, next) => {
    let provide = req.app.get('borrower.provide');
    provide.provideCheck(req.body.name_user, req.body.book_id).then( data => {
        if(data.length) {
            res.send({message: 'You registered borrow'});
        }

        else {
            next();
        }
    });
};