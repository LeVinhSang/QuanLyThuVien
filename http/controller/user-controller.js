let jwt = require('jsonwebtoken');

class UserController {

    create (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.add(req.user).then(() => {
            res.send(req.user);
        }).catch(next);
    }

    update (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.edit(req.user).then(() => {
            let token = jwt.sign({
                user_name: req.user.user_name,
                email    : req.user.email,
                avatar   : req.user.avatar,
                password : req.user.password
            }, 'sang');
            res.send(token);
        }).catch(next);
    }

    updateNotPass (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.editNotPass(req.body.user_name, req.body.avatar, req.body.email).then(() => {
            let token = jwt.sign({
                user_name: req.body.user_name,
                email    : req.body.email,
                avatar   : req.body.avatar,
                password : req.body.password
            }, 'sang');
            res.send(token);
        }).catch(next);
    }

    search (req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideDetail(req.params.user_name).then(user => {
            res.send(user);
        })
    }

    remove (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.delete(req.params.user_name).then(() => {
            res.send('message');
        }).catch(next);
    }

    active (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.activated(req.params.user_name).then(() => {
            res.send('message');
        }).catch(next);
    }

    sendCode (req, res, next) {
        let service = req.app.get('code.service');
        service.sendCode(req.body.email, req.body.code).then(() => {
            res.send('success');
        }).catch(next)
    }

    login (req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provide(req.body.user_name).then((user) => {
            let data  = {
                user_name: user.user_name,
                email    : user.email,
                password : user.password,
                avatar   : user.avatar,
                role     : user.role
            };
            let token = jwt.sign(data, 'sang');
            res.send(token);
        }).catch(next);
    }

    signUp (req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideSignUp(req.body.user_name).then((user) => {
            let data  = {
                user_name: user.user_name,
                email    : user.email,
                password : user.password,
                avatar   : user.avatar,
                role     : user.role
            };
            let token = jwt.sign(data, 'sang');
            res.send(token);
        }).catch(next);
    }

    checkEmail (req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideCheckEmail(req.body.email).then((user) => {
            res.send(user);
        }).catch(next);
    }

    checkSignUp (req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideCheckSignUp(req.params.user_name).then((users) => {
            users.length ? res.send({ message: 'success' }) : res.send({ message: 'user name existed' })
        }).catch(next);
    }

    checkPass (req, res, next) {
        let repo = req.app.get('user.repo');
        repo.checkPassword(req.body.password, req.body.hash).then(data => res.send(data)).catch(next);
    };
}

module.exports = UserController;
