const Publisher = require('./publisher');

class PublisherFactory {

    /**
     *
     * @param publisherRaw
     * @returns {Publisher}
     */
    makeFromDB(publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setId(publisherRaw.id);
        publisher.setPhone(publisherRaw.phone);
        publisher.setAddress(publisherRaw.address);
        return publisher;
    }
}

module.exports = PublisherFactory;

