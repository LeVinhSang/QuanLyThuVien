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

    async provideSignUp(user_name) {
        return await this.connection('users').select('user_name')
            .where({user_name: user_name})
            .then( results => {
                if(results.length === 0) {
                    return new User('', '');
                }
                return new User(results[0].user_name, '')
            });
    }

    async provideCheckEmail(email) {
        let factory = this.factory;
        return await this.connection('users').select('user_name')
            .where({email: email})
            .then( results => {
                if(results.length === 0) {
                    return new User('', '');
                }
                return results.map(result => {
                    result.role= '';
                    result.password = '';
                    return factory.makeFromDB(result)
                });
            });
    }

    async provideCheckSignUp() {
        let factory = this.factory;
        return await this.connection('users').select('user_name')
            .then( results => results.map(result => factory.makeFromDB(result)));
    }
}

module.exports = UserProvider;
