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
        return await this.connection('publishers').select()
            .where({id: id})
            .then( results => factory.makeFromDB(results[0]));
    }

    async provideAll() {
        let factory = this.factory;
        return await this.connection('publishers').select()
            .then( results => results.map(result => factory.makeFromDB(result)));
    }
}

module.exports = PublisherProvider;
