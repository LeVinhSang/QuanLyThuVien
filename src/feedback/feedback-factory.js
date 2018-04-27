const Feedback = require('./feedback');

class FeedbackFactory {

    constructor(app) {
        this.app = app;
    }

    /**
     *
     * @param feedbackRaw
     * @returns {Promise<Feedback>}
     */
    async makeFromRequest(feedbackRaw) {
        let userProvider = this.app.get('user.provide');
        let topicProvider = this.app.get('topic.provide');
        let user = await userProvider.provide(feedbackRaw.name_user_feedback);
        let topic = await topicProvider.provide(feedbackRaw.topic_id);
        let feedback = new Feedback(user, topic);
        feedback.setComment(feedbackRaw.comment);
        return feedback;
    }

    /**
     *
     * @param feedbackRaw
     * @returns {Feedback}
     */
    makeFromDB(feedbackRaw) {
        let userFactory = this.app.get('user.factory');
        let topicFactory = this.app.get('topic.factory');
        let user = userFactory.makeFromDB(feedbackRaw);
        let topic = topicFactory.makeFromDB(feedbackRaw);
        let feedback = new Feedback(user, topic);
        feedback.setComment(feedbackRaw.comment);
        feedback.setDate_comment(feedbackRaw.date_comment);
        feedback.setId(feedbackRaw.id);
        return feedback;
        
    }
}

module.exports = FeedbackFactory;
