class CurriculumRepository {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Curriculum} curriculum
     * @returns {Promise <void> }
     */
    async add(curriculum) {
        return await this.connection('curriculums').insert({
            name: curriculum.getName(),
            author: curriculum.getAuthor(),
            url: curriculum.getUrl(),
            images: curriculum.getImages(),
        });
    }


    /**
     *
     * @param {Curriculum} curriculum
     * @returns {Promise <void> }
     */
    async edit(curriculum) {
        return await this.connection('curriculums').update({
            name: curriculum.getName(),
            author: curriculum.getAuthor(),
            url: curriculum.getUrl(),
            images: curriculum.getImages(),
        }).where({id : curriculum.getId()});
    }

}

module.exports = CurriculumRepository;
