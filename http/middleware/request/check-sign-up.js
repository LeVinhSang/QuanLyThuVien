module.exports = (req,  res, next) => {
    let provide = req.app.get('user.provide');
    provide.provide(req.body.user_name).then( user => {
        if(user.user.name === '') {
            res.send({message: 'user name existed!'})
        }

        else {
            next();
        }
    })
};