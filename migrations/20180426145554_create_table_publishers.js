
exports.up = function(knex, Promise) {
    return knex.schema.createTable('publishers', (table) => {
        table.increments('id');
        table.string('name').notNull();
        table.string('address').notNull();
        table.integer('phone');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('publishers');
};
