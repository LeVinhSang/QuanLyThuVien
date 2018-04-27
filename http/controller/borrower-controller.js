class BorrowerController {

    create(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.add(req.borrower).then( () => {
            res.send('success');
        }).catch(next)
    }

    update(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.edit(req.borrower).then( () => {
            res.send('success');
        }).catch(next)
    }


    remove(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.delete(req.params.id).then( () => {
            res.send('success');
        }).catch(next)
    }

    search(req, res, next) {
        let service = req.app.get('borrower.searcher');
        service.search(req.condition).then( borrowers => {
            res.json(borrowers);
        }).catch(next);
    }
}

module.exports = BorrowerController;
