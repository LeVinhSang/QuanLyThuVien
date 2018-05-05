class UserProvider {

    /**
     *
     * @param connection
     * @param {UserFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param {string} user_name
     * @returns {Promise<*>}
     */
    async provide(user_name) {
        let factory = this.factory;
        let user = await this.connection('users').select()
            .where({user_name: user_name})
            .then( results => factory.makeFromDB(results[0]));
        return user;
    }

}

module.exports = UserProvider;
