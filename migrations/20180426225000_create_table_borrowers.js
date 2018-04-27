
exports.up = function(knex, Promise) {
    return knex.schema.createTable('borrowers', (table) => {
        table.increments('id');
        table.string('name_user').notNull();
        table.integer('book_id').notNull();
        table.date('date_borrow');
        table.date('date_return');
        table.date('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('borrowers');
};
