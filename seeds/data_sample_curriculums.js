
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('curriculums').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('curriculums').insert([
          {
              name: 'Chuẩn trao đổi tài liệu số hoá dựa trên Dublin Core Metadata',
              url: 'http://www.glib.hcmus.edu.vn/bantin/bt404/bai5.pdf',
              author: 'TS. Hoàng Lê Minh',
              images: 'http://image.phimmoi.net/film/3766/poster.medium.jpg'
          },
          {
              name: 'C Programming Tutorial',
              url: 'https://www.tutorialspoint.com/cprogramming/cprogramming_tutorial.pdf',
              author: 'https://store.tutorialspoint.com',
              images: 'http://image.phimmoi.net/film/3766/poster.medium.jpg'
          }
      ]);
    });
};
