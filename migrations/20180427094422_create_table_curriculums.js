
exports.up = function(knex, Promise) {
    return knex.schema.createTable('curriculums', (table) => {
        table.increments('id');
        table.string('name');
        table.string('author');
        table.string('images');
        table.string('url');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('curriculums');
};
