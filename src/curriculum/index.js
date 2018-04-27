const CurriculumRepository = require('./curriculum-repository');
const CurriculumFactory    = require('./curriculum-factory');
const Search               = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('curriculum.repo', new CurriculumRepository(connection));
    app.set('curriculum.factory', new CurriculumFactory());
    app.set('curriculum.searcher', new Search(connection, new CurriculumFactory()));
};