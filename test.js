let date = new Date();
date.setDate(date.getDate() -2);
console.log(date > Date.parse('2018/06/19'));