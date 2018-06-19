
exports.up = function(knex, Promise) {
    return knex.schema.createTable('borrowers', (table) => {
        table.increments('id');
        table.string('name_user').notNull();
        table.integer('book_id').notNull();
        table.string('date_borrow');
        table.string('date_return');
        table.string('status');
        table.string('receiving_status');
        table.string('sent_mail');
        table.string('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('borrowers');
};
