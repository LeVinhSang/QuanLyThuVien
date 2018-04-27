class TopicProvider {

    /**
     *
     * @param connection
     * @param {TopicFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    async provide(id) {
        let factory = this.factory;
        let topic = await this.connection('topics').select('topics.name_user', 'topics.id', 'topics.content', 'topics.title',
            'topics.date_create', 'users.user_name', 'users.email')
            .where({'topics.id': id})
            .leftJoin('users', function () {
                this.on('users.user_name', '=', 'topics.name_user');
            }).then( topics => factory.makeFromDB(topics[0]));
        return topic;

    }
}

module.exports = TopicProvider;
