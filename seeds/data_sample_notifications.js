exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('notifications').del()
        .then(function () {
            // Inserts seed entries
            return knex('notifications').insert([
                { id    : 1,
                    info: 'Quản lý thư viện là công việc phổ biến và cần thiết trong bất kì Trường đại học nào.  Để thuận tiện hơn trong việc quản lý cần phải phát triển một hệ thống thông tin phục vụ nhu cầu quản lý hiệu quả.'
                },
                { id       : 2,
                    info: 'Thư viện là nơi lưu trữ một khối lượng kiến thức đồ sộ và hết sức quý giá đối với việc học tập, nghiên cứu của sinh viên... Nhưng hiện nay, việc quản lý thư viện theo cách truyền thống '
                },
                { id       : 3,
                    info: 'Còn về phía người quản lý thư viện, công việc quản lý mượn sách một cách thủ công chiếm của họ khá nhiều thời gian, sức lực và vật chất. Chính vì lý do trên đã khiến cho việc tin học'
                }
            ]);
        });
};
