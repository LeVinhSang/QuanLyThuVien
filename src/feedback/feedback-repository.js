class FeedbackRepository {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Feedback} feedback
     */
    add(feedback) {
        return this.connection('feedbacks').insert({
            name_user_feedback: feedback.getUser().getUser_name(),
            topic_id: feedback.getTopic().getId(),
            comment: feedback.getComment(),
            date_comment: new Date()
        });
    }

    edit(feedback) {
        return this.connection('feedbacks').update({
            topic_id: feedback.getTopic().getId(),
            comment: feedback.getComment()
        }).where({id: feedback.getId()});
    }

    delete(id) {
        return this.connection('feedbacks').update({
            deleted_at: new Date()
        }).where({id: id});
    }
 }

module.exports = FeedbackRepository;
