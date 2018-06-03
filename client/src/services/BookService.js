class BookService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getBooks() {
        return this.axios.get(`${this.config.domain}/books`);
    }

    deleteBook(id) {
        return this.axios.delete(`${this.config.domain}/book/${id}`);
    }

    getBook(id) {
        return this.axios.get(`${this.config.domain}/book/${id}`);
    }

    updateBook(data) {
        return this.axios.put(`${this.config.domain}/book`, data);
    }

    getPublisher() {
        return this.axios.get(`${this.config.domain}/publishers`);
    }
}

export default BookService;
