class PublisherProvider {

    /**
     * 
     * @param connection
     * @param {PublisherFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory    = factory;
    }
    
    async provide(id) {
        let factory = this.factory;
        let publisher = await this.connection('publishers').select()
            .where({id: id})
            .then( results => factory.makeFromDB(results[0]));
        return publisher;
    }
}

module.exports = PublisherProvider;
