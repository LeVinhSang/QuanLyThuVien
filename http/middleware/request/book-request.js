module.exports = async (req, res, next) => {
    let factory = req.app.get('book.factory');
    let book = await factory.makeFromRequest(req.body);
    book.setId(req.params.id);
    req.book = book;
    next();
};