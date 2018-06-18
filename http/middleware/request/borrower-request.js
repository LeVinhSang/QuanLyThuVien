module.exports = async (req, res, next) => {
    let factory = req.app.get('borrower.factory');
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    let borrower = await factory.makeFromRequest(req.body);
    borrower.setId(req.body.id);
    borrower.setDate_borrow(date.getFullYear() + '/' + date.getMonth() + '/'+ date.getDate());
    borrower.setReceivingStatus(date.getFullYear() + '/' + date.getMonth() + '/'+ date.getDate());
    req.borrower = borrower;
    next();
};