
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.string('user_name').primary();
        table.string('password').notNull();
        table.string('email').notNull();
        table.string('role');
        table.string('status');
        table.integer('code');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
