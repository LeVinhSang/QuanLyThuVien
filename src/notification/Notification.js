class Notification {

    /**
     *
     * @param {string} info
     */
    constructor(info) {
        this.info = info
    }

    /**
     *
     * @returns {string|*}
     */
    getInfo() {
        return this.info;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

module.exports = Notification;