module.exports = async (req, res, next) => {
    let factory = req.app.get('borrower.factory');
    let borrower = await factory.makeFromRequest(req.body);
    borrower.setId(req.params.id);
    borrower.setDate_borrow(new Date().toLocaleString());
    req.borrower = borrower;
    next();
};