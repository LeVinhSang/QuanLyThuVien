
exports.up = function(knex, Promise) {
    return knex.schema.createTable('feedbacks', (table) => {
        table.increments('id');
        table.string('name_user_feedback').notNull();
        table.integer('topic_id').notNull();
        table.string('comment');
        table.date('date_comment');
        table.date('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('feedbacks');
};
