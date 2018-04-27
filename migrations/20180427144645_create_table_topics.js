
exports.up = function(knex, Promise) {
    return knex.schema.createTable('topics', (table) => {
        table.increments('id');
        table.string('name_user').notNull();
        table.string('title').notNull();
        table.string('content');
        table.date('date_create');
        table.date('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('topics');
};
