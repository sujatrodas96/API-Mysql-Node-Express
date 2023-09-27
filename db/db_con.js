const mysql = require('mysql');
var conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'nodeapi'
});

conn.connect((error)=>{
    if(error) throw error;
    else
    console.log('DataBase Connected');
});

module.exports = conn;
console.log('database is ready for used');