
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', (table) => {
        table.increments('id');
        table.string('title').notNull();
        table.string('author').notNull();
        table.string('images');
        table.integer('publisher_id');
        table.integer('amount');
        table.string('genre');
        table.date('deleted_at');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
