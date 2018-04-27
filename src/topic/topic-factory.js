const Topic = require('./topic');

class TopicFactory {

    constructor(app) {
        this.app = app;
    }

    /**
     *
     * @param topicRaw
     * @returns {Topic}
     */
    async makeFromRequest(topicRaw) {
        let userProvider = this.app.get('user.provide');
        let user = await userProvider.provide(topicRaw.name_user);
        let topic = new Topic(user, topicRaw.title);
        topic.setDate_create(topicRaw.date_create);
        topic.setContent(topicRaw.content);
        topic.setId(topicRaw.id);
        return topic;
    }

    /**
     *
     * @param topicRaw
     * @returns {Topic}
     */
    makeFromDB(topicRaw) {
        let userFactory = this.app.get('user.factory');
        let user = userFactory.makeFromDB(topicRaw);
        let topic = new Topic(user, topicRaw.title);
        topic.setContent(topicRaw.content);
        topic.setDate_create(topicRaw.date_create);
        topic.setId(topicRaw.id);
        return topic;

    };
}

module.exports = TopicFactory;
