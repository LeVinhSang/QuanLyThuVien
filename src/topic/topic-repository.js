class TopicRepository {

    /**
     *
     * @param connection
     * @returns {Promise <void> }
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Topic} topic
     */
    async add(topic) {
        return this.connection('topics').insert({
            name_user: topic.getUser().getUser_name(),
            title: topic.getTitle(),
            content: topic.getContent(),
            date_create: new Date()
        });
    }

    /**
     *
     * @param {Topic} topic
     * @returns {Promise <void> }
     */
    async edit(topic) {
        return this.connection('topics').update({
            title: topic.getTitle(),
            content: topic.getContent(),
        }).where({id : topic.getId})
    }

    /**
     *
     * @param {int} id
     * @returns {Promise <void> }
     */
    async delete(id) {
        return this.connection('topics').update({
            deleted_at: new Date()
        }).where({id : id})
    }
}

module.exports = TopicRepository;
