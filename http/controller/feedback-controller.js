class FeedbackController {

    create(req, res, next) {
        let repo = req.app.get('feedback.repo');
        repo.add(req.feedback).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('feedback.repo');
        repo.edit(req.feedback).then( () => {
            res.send('success');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('feedback.repo');
        repo.delete(req.params.id).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let service = req.app.get('feedback.searcher');
        service.search(req.condition).then( feedbacks => {
            res.json(feedbacks);
        }).catch(next);
    }

}

module.exports = FeedbackController;
