class BookService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getBooks() {
        return this.axios.get(`${this.config.domain}/books`);
    }
}

export default BookService;
