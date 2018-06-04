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
}

export default LoginService;
