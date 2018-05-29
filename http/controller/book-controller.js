class BookController {

    create(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.add(req.book).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.edit(req.book).then( () => {
            res.send('success');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.delete(req.body.id).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let service = req.app.get('book.searcher');
        service.search(req.condition).then( books => {
            res.json(books);
        }).catch(next);
    }

    searchForReact(req, res, next) {
        let service = req.app.get('book.searcher');
        service.search(req.condition).then( books => {
            res.json(books.map(book => book.toJson()));
        }).catch(next);
    }
}

module.exports = BookController;
