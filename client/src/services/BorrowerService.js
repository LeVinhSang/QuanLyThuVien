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

    deleteBorrower(id, id_book) {
        return this.axios.delete(`${this.config.domain}/borrower/${id}`, {id_book: id_book});
    }

    updateBorrower(data) {
        return this.axios.put(`${this.config.domain}/borrower`, data);
    }

    createBorrower(data) {
        return this.axios.post(`${this.config.domain}/borrower`, data);
    }

    updateReceive(id) {
        return this.axios.put(`${this.config.domain}/borrower/receiving-status/${id}`);
    }
}

export default BorrowerService;
