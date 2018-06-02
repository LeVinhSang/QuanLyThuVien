class BorrowerService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getBorrowers() {
        return this.axios.get(`${this.config.domain}/borrowers`);
    }

    updateStatus(id) {
        return this.axios.get(`${this.config.domain}/borrower/${id}`);
    }
}

export default BorrowerService;
