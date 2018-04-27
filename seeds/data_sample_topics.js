
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
          {
              name_user: 'levinhsang',
              title: 'Thảo luận về việc cải cách nội dung dạy',
              content: 'test',
              date_create: new Date()
          }
      ]);
    });
};
