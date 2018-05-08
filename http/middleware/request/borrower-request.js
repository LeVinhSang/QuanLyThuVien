module.exports = async (req, res, next) => {
    let factory = req.app.get('borrower.factory');
    let borrower = await factory.makeFromRequest(req.body);
    borrower.setId(req.body.id);
    borrower.setDate_borrow(new Date().toISOString().substr(0, 10));
    req.borrower = borrower;
    next();
};