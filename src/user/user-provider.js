const User = require('./user');

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
        return await this.connection('users').select()
            .where({user_name: user_name})
            .then( results => {
                if(results.length === 0) {
                    let user = new User('', '');
                    user.setPassword('');
                    return user;
                }
                return factory.makeFromDB(results[0])
            });
    }

}

module.exports = UserProvider;
