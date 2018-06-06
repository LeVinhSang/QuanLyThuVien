let jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'sang');
console.log(token);
var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZXZpbmhzYW5nIiwiZW1haWwiOiJzYW5nbHZAc3BoaW54LXNvZnR3YXJlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGxQbHBMbE93LjE4QWo0Um85ZWdqU3VWcUw0VUNPcjNnbTI1VEM1UllzeUNySUt0ZVI3dVVHIiwiYXZhdGFyIjoiaHR0cDovL3d3dy4xOTk5LmNvLmpwL2l0YmlnNDgvMTA0ODU3NTguanBnIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTI4MjY0Mzc2fQ.q9ur-YsvXxxmVHLq4lj2MAOnmQk7uVEUxWHKTmXn1XE', 'sang');
console.log(decoded);