class NotificationRepository {

    constructor (connection) {
        this.connection = connection;
    }

    add(info) {
        return this.connection('notifications').insert({
            info: info
        });
    }
}

module.exports = NotificationRepository;