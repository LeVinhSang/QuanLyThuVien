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
        user.setAvatar(userRaw.avatar);
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
        user.setAvatar(userRaw.avatar);
        return user;
    }
}

module.exports = UserFactory;
