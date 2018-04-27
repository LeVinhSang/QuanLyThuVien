module.exports = async (req, res, next) => {
    let factory = req.app.get('curriculum.factory');
    let curriculum = await factory.make(req.body);
    curriculum.setId(req.params.id);
    req.curriculum = curriculum;
    next();
};