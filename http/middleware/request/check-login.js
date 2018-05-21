const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
    let provide = req.app.get('user.provide');
    provide.provide(req.body.user_name).then( async (user) => {
        let check = await bcrypt.compare(req.body.password, user.password).then(res);
        if(check === true) {
            next();
        }

        else {
            res.send({message: 'login false'})
        }
    })
};