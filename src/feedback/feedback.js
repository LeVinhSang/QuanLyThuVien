class Feedback {

    /**
     *
     * @param {User} user
     * @param {Topic} topic
     */
    constructor(user, topic) {
        this.user = user;
        this.topic = topic;
    }

    /**
     *
     * @returns {user|*}
     */
    getUser() {
        return this.user;
    }

    /**
     *
     * @param {string} comment
     */
    setComment(comment) {
        this.comment = comment;
    }

    /**
     *
     * @returns {string|*}
     */
    getComment() {
        return this.comment;
    }

    /**
     *
     * @returns {Topic|*}
     */
    getTopic() {
        return this.topic;
    }

    /**
     *
     * @param {string} date_comment
     */
    setDate_comment(date_comment) {
        this.date_comment = date_comment;
    }
    /**
     *
     * @returns {string}
     */
    getDate_comment() {
        return this.date_comment;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @returns {int|*}
     */
    getId() {
        return this.id;
    }

}

module.exports = Feedback;
