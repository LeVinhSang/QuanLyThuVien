module.exports = async (req, res, next) => {
    let factory = req.app.get('user.factory');
    req.user = await factory.make(req.body);
    next();
};