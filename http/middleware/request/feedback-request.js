module.exports = async (req, res, next) => {
    let factory = req.app.get('feedback.factory');
    let feedback = await factory.makeFromRequest(req.body);
    feedback.setId(req.params.id);
    req.feedback = feedback;
    next();
};