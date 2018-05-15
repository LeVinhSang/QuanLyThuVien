
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('borrowers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('borrowers').insert([
          {name_user: 'levinhsang', book_id: 1, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending', date_return: '2018-06-20'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
          {name_user: 'levinhsang1', book_id: 2, date_borrow: new Date().toISOString().substr(0, 10), status: 'pending',date_return: '2018-06-30'},
      ]);
    });
};
