module.exports = async (req, res, next) => {
    let provide = req.app.get('user.provide');
    let user = await provide.provide(req.body.user_name);
    if(user.name_user !== '') {
        res.send({message: 'sign up false'});
    }

    else {
        next();
    }
};