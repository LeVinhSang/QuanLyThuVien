module.exports = async (req, res, next) => {
    let factory = req.app.get('borrower.factory');
    let borrower = await factory.makeFromRequest(req.body);
    borrower.setId(req.params.id);
    req.borrower = borrower;
    next();
};