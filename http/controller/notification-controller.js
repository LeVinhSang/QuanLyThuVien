class NotificationController {

    create(req, res, next) {
        let repo = req.app.get('notification');
        repo.add(req.body.info).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let provide = req.app.get('notification-provide');
        provide.provide().then( data => res.send(data)).catch(next);
    }
}

module.exports = NotificationController;