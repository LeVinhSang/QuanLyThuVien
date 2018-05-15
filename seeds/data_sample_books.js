
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
          images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'},
          {title: 'One Piece', author: 'Anything', publisher_id: 2, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/665/poster.medium.jpg'},
          {title: 'One Piece', author: 'Anything', publisher_id: 2, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/665/poster.medium.jpg'},
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'},
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'},
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'},
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'},
          {title: 'Dragon Ball', author: 'Akira', publisher_id: 1, genre: 'comic', amount: 10,
              images: 'http://image.phimmoi.net/film/2844/preview.medium.jpg?_v=1524138063'}
      ]);
    });
};
