class LoginService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    loginForm(data) {
        return this.axios.post(`${this.config.domain}/login`, data);
    }
}

export default LoginService;
