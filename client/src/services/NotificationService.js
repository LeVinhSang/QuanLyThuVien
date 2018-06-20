class NotificationService {

    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getNotifications() {
        return this.axios.get(`${this.config.domain}/notifications`);
    }

    addNotification(info) {
        return this.axios.post(`${this.config.domain}/notification`, {info: info});
    }
}

export default NotificationService;