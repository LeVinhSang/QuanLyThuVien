const bcrypt = require('bcrypt');

function test() {
    bcrypt.hash('sang', 10).then( hash => {
        console.log(hash);
    });
}

test();