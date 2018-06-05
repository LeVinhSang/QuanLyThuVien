class UserController {

    create(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.add(req.user).then(() => {
            res.send(req.user);
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.edit(req.user).then(() => {
            res.send({message: 'success'});
        }).catch(next);
    }

    search(req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideDetail(req.params.user_name).then( user => {
            res.send(user);
        })
    }

    remove(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.delete(req.params.user_name).then(() => {
            res.send('message');
        }).catch(next);
    }

    active(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.activated(req.params.user_name).then(() => {
            res.send('message');
        }).catch(next);
    }

    sendCode(req, res, next) {
        let service = req.app.get('code.service');
        service.sendCode(req.body.email, req.body.code).then(() => {
            res.send('success');
        }).catch(next)
    }

    login(req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provide(req.body.user_name).then((user) => {
            res.send(user);
        }).catch(next);
    }

    signUp(req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideSignUp(req.body.user_name).then((user) => {
            res.send(user);
        }).catch(next);
    }

    checkEmail(req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideCheckEmail(req.body.email).then((user) => {
            res.send(user);
        }).catch(next);
    }

    checkSignUp(req, res, next) {
        let repo = req.app.get('user.provide');
        repo.provideCheckSignUp(req.params.user_name).then((users) => {
            users.length ? res.send({message: 'success'}) : res.send({message: 'user name existed'})
        }).catch(next);
    }
}

module.exports = UserController;
