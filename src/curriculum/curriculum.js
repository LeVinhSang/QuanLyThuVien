class Curriculum {

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     *
     * @returns {string|*}
     */
    getName() {
        return this.name;
    }

    /**
     *
     * @param {string} author
     */
    setAuthor(author) {
        this.author = author;
    }

    /**
     *
     * @returns {string|*}
     */
    getAuthor() {
        return this.author;
    }

    /**
     *
     * @param {string} url
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     *
     * @returns {string|*}
     */
    getUrl() {
        return this.url;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @returns {int|*}
     */
    getId() {
         return this.id;
    }

    /**
     *
     * @param {string} images
     */
    setImages(images) {
        this.images = images;
    }

    /**
     *
     * @returns {string|*}
     */
    getImages() {
        return this.images;
    }

}

module.exports = Curriculum;
