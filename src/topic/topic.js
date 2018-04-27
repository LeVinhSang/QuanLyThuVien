class Topic {

    /**
     *
     * @param {string} title
     * @param {User} user
     */
    constructor(user, title) {
        this.user = user;
        this.title = title;
    }

    /**
     * 
     * @returns {User|*}
     */
    getUser() {
        return this.user;
    }
    
    /**
     *
     * @returns {string|*}
     */
    getTitle() {
        return this.title;
    }

    /**
     * 
     * @param {string} content
     */
    setContent(content) {
        this.content = content;
    }
    
    /**
     *
     * @returns {string|*}
     */
    getContent() {
        return this.content;
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

    /**
     *
     * @param {string} date_create
     */
    setDate_create(date_create) {
        this.date_create = date_create;
    }

    /**
     *
     * @returns {string|*}
     */
    getDate_create() {
        return this.date_create;
    }

}


module.exports = Topic;
