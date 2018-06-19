class LoginService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    loginForm(data) {
        return this.axios.post(`${this.config.domain}/login`, data);
    }

    sendCodeConfirm(data) {
        return this.axios.post(`${this.config.domain}/send-code`, data);
    }

    createUser(data) {
        return this.axios.post(`${this.config.domain}/user`, data);
    }

    checkSignUp(data) {
        return this.axios.get(`${this.config.domain}/user/${data}`);
    }

    getUser(user_name) {
        return this.axios.get(`${this.config.domain}/search-advance/${user_name}`);
    }

    updateUser(data) {
        return this.axios.put(`${this.config.domain}/user`, data);
    }

    checkPass(password, hash) {
        return this.axios.post(`${this.config.domain}/check-pass`, {password: password, hash: hash});
    }

    updateNotPass(data) {
        return this.axios.put(`${this.config.domain}/not-pass/user`, data);
    }
}

export default LoginService;
