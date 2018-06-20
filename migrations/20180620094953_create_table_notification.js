
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notifications', (table) => {
        table.increments('id');
        table.string('info');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notifications');
};
