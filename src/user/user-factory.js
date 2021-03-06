const User   = require('./user');
const bcrypt = require('bcrypt');

class UserFactory {

    /**
     *
     * @param userRaw
     * @returns {Promise<User>}
     */
    async make(userRaw) {
        let user = new User(userRaw.user_name, userRaw.email);
        let hash = await bcrypt.hash(userRaw.password, 10).then( hash => hash);
        user.setPassword(hash);
        user.setRole(userRaw.role);
        return user;
    }

    /**
     *
     * @param userRaw
     * @returns {User}
     */
    makeFromDB(userRaw) {
        let user = new User(userRaw.user_name, userRaw.email);
        user.setPassword(userRaw.password);
        user.setRole(userRaw.role);
        return user;
    }
}

module.exports = UserFactory;
