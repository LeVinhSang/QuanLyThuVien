class BorrowerController {

    create(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.add(req.borrower, req.body.id_book).then( borrower => {
            req.borrower.setId(borrower[0]);
            res.send(req.borrower);
        }).catch(next)
    }

    update(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.edit(req.borrower).then( () => {
            res.send(req.borrower);
        }).catch(next)
    }


    remove(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.delete(req.body.id).then( () => {
            res.send('success');
        }).catch(next)
    }

    confirm(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.confirm(req.params.id).then( () => {
            res.send('success');
        }).catch(next)
    }

    search(req, res, next) {
        let service = req.app.get('borrower.searcher');
        service.search(req.condition).then( borrowers => {
            res.send(borrowers);
        }).catch(next);
    }

    sendMail(req, res, next) {
        let sendMail = req.app.get('email.service');
        sendMail.send().then( () => {
            res.send('success');
        }).catch(next);
    }
}

module.exports = BorrowerController;
