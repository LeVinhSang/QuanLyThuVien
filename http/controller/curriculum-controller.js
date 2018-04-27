class CurriculumController {

    create(req, res, next) {
        let repo = req.app.get('curriculum.repo');
        repo.add(req.curriculum).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('curriculum.repo');
        repo.edit(req.curriculum).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let service = req.app.get('curriculum.searcher');
        service.search(req.condition).then( curriculums => {
            res.json(curriculums);
        }).catch(next);
    }
}

module.exports = CurriculumController;
