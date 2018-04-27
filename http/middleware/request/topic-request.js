module.exports = async (req, res, next) => {
    let factory = req.app.get('topic.factory');
    let topic = await factory.makeFromRequest(req.body);
    topic.setId(req.params.id);
    req.topic = topic;
    next();
};