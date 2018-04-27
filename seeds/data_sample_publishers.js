
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('publishers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('publishers').insert([
          {id: 1, name: "NXB-Hà Nội", address: "Hà Nội", phone: '01648021510'},
          {id: 2, name: "NXB-Kim Đồng", address: "Hà Nội", phone: '01648021511'},
          {id: 3, name: "NXB-Nhi Đồng", address: "Hà Nội", phone: '01648021512'}
      ]);
    });
};
