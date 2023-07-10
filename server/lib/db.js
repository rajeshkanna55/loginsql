const mysql = require('mysql2');


const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '8838',
   database: 'users',
  
 })
 
 connection.connect((err) => {
    if (err) {
        console.log("error" + err);
    } else {
        console.log('Connected to database');
       
    }
 })

 module.exports = connection;