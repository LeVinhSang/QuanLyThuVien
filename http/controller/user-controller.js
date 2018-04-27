class UserController {

    create(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.add(req.user).then( () => {
            res.send('message');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.edit(req.user).then( () => {
            res.send('message');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.delete(req.params.user_name).then( () => {
            res.send('message');
        }).catch(next);
    }

    active(req, res, next) {
        let repo = req.app.get('user.repo');
        repo.activated(req.params.user_name).then( () => {
            res.send('message');
        }).catch(next);
    }
}

module.exports = UserController;
