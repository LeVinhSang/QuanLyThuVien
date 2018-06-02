class BorrowerService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getBorrowers() {
        return this.axios.get(`${this.config.domain}/borrowers`);
    }

    updateStatus(id, data) {
        return this.axios.put(`${this.config.domain}/borrower/status/${id}`, data);
    }

    getBorrower(id) {
        return this.axios.get(`${this.config.domain}/borrower/${id}`);
    }
}

export default BorrowerService;
