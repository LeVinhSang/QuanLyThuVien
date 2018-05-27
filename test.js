

function test() {
    let date = new Date();
    date.setMonth( date.getMonth() + 1);
    date = date.toISOString().substr(0, 10);
    console.log(date);
}

test();