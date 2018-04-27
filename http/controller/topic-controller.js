class TopicController {

    create(req, res, next) {
        let repo = req.app.get('topic.repo');
        repo.add(req.topic).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('topic.repo');
        repo.edit(req.topic).then( () => {
            res.send('success');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('topic.repo');
        repo.delete(req.params.id).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let service = req.app.get('topic.searcher');
        service.search(req.condition).then( topics => {
            res.json(topics);
        }).catch(next);
    }
}

module.exports = TopicController;
