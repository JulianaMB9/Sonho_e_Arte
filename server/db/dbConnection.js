const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1472'
});

dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = dbConnection;