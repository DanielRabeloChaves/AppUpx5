require('dotenv').config();
const mysql = require('mysql2/promise');

const ConnectionDB = mysql.createPool({
    "host": process.env.DB_host,
    "user": process.env.DB_user,
    "password": process.env.DB_password,
    "database": process.env.DB_database,
    "port": process.env.DB_port
});
  
exports.ConnectionDB = ConnectionDB;
