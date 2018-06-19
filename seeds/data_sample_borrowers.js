exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('borrowers').truncate()
        .then(function () {
            // Inserts seed entries
            return knex('borrowers').insert([
                {
                    name_user       : 'levinhsang',
                    book_id         : 1,
                    date_borrow     : '2018/01/10',
                    status          : 'confirm',
                    date_return     : '2018-06-20',
                    receiving_status: '2018/01/10'
                },
                {
                    name_user       : 'levinhsang1',
                    book_id         : 2,
                    date_borrow     : '2018/02/10',
                    status          : 'confirm',
                    date_return     : '2018-06-30',
                    receiving_status: '2018/02/10'
                },
                {
                    name_user       : 'levinhsang1',
                    book_id         : 2,
                    date_borrow     : '2018/03/10',
                    status          : 'confirm',
                    date_return     : '2018-06-30',
                    receiving_status: '2018/02/10'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/04/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/03/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/05/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/06/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/07/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/08/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/09/10',
                    status     : 'confirm',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2017/09/10',
                    status     : 'confirm',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2018/6/10',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
                {
                    name_user  : 'levinhsang1',
                    book_id    : 2,
                    date_borrow: '2018/06/19',
                    status     : 'pending',
                    date_return: '2018-06-30'
                },
            ]);
        });
};
