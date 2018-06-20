class NotificationProvider {
    constructor (connection) {
        this.connection = connection;
    }

    provide() {
        return this.connection('notifications').select()
            .limit(3).orderBy('id', 'desc')
    }
}

module.exports = NotificationProvider;