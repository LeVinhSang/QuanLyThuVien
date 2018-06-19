class BorrowerService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getBorrowers() {
        return this.axios.get(`${this.config.domain}/borrowers`);
    }

    getBorrowersManagement() {
        return this.axios.get(`${this.config.domain}/management/borrowers`);
    }

    updateStatus(id, data) {
        return this.axios.put(`${this.config.domain}/borrower/status/${id}`, data);
    }

    getBorrower(id) {
        return this.axios.get(`${this.config.domain}/borrower/${id}`);
    }

    deleteBorrower(id, id_book) {
        return this.axios.post(`${this.config.domain}/borrower/${id}`, {id_book: id_book});
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

    deleteOutBorrowed() {
        return this.axios.get(`${this.config.domain}/out-borrowed/borrower`);
    }

    sendMailOutDate() {
        return this.axios.get(`${this.config.domain}/send-mail-out-date/borrower`);
    }
}

export default BorrowerService;
