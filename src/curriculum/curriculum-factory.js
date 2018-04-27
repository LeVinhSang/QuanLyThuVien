const Curriculum = require('./curriculum');

class CurriculumFactory {

    /**
     *
     * @param curriculumRaw
     * @returns {Promise<Curriculum>}
     */
    async make(curriculumRaw) {
        let curriculum = new Curriculum(curriculumRaw.name);
        curriculum.setAuthor(curriculumRaw.author);
        curriculum.setId(curriculumRaw.id);
        curriculum.setImages(curriculumRaw.images);
        curriculum.setUrl(curriculumRaw.url);
        return curriculum;
    }

    /**
     *
     * @param curriculumRaw
     * @returns {Curriculum}
     */
    makeFromDB(curriculumRaw) {
        let curriculum = new Curriculum(curriculumRaw.name);
        curriculum.setAuthor(curriculumRaw.author);
        curriculum.setId(curriculumRaw.id);
        curriculum.setImages(curriculumRaw.images);
        curriculum.setUrl(curriculumRaw.url);
        return curriculum;
    }
}

module.exports = CurriculumFactory;
