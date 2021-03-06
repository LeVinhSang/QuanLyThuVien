class User {

    /**
     *
     * @param {string} user_name
     * @param {string} email
     */
    constructor(user_name, email) {
        this.user_name = user_name;
        this.email = email;
    }

    /**
     *
     * @returns {string|*}
     */
    getUser_name() {
        return this.user_name;
    }

    /**
     *
     * @returns {string|*}
     */
    getEmail() {
        return this.email;
    }

    /**
     *
     * @param {string} password
     */
    setPassword(password) {
        this.password = password;
    }

    /**
     *
     * @returns {string|*}
     */
    getPassword() {
        return this.password;
    }

    /**
     *
     * @param {string} status
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     *
     * @returns {string|*}
     */
    getStatus() {
        return this.status;
    }

    /**
     *
     * @param {int} code_confirm
     */
    setCode(code_confirm) {
        this.code_confirm = code_confirm;
    }

    getCode() {
        return this.code_confirm;
    }

    /**
     *
     * @param {string} role
     */
    setRole(role) {
        this.role = role;
    }

    /**
     *
     * @returns {string|*}
     */
    getRole() {
        return this.role;
    }
}

module.exports = User;
