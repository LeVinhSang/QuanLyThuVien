const status = require('./status');

class UserRepository {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    add(user) {
        return this.connection('users').insert({
            user_name: user.getUser_name(),
            password: user.getPassword(),
            avatar: user.getAvatar(),
            email: user.getEmail(),
            status: status.ACTIVATED
        });
    }

    edit(user) {
        return this.connection('users').update({
            password: user.getPassword(),
            avatar: user.getAvatar(),
            email: user.getEmail()
        }).where({user_name: user.getUser_name()});
    }

    delete(user_name) {
        return this.connection('users').update({
            status: status.DISABLE + new Date()
        }).where({user_name: user_name});
    }

    activated(user_name) {
        return this.connection('users').update({
            status: status.ACTIVATED
        }).where({user_name: user_name});
    }

}

module.exports = UserRepository;
