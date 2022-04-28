require('dotenv').config();
const mysql = require("mysql");
const util = require('util'); //For promisify
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  timezone: 'Asia/Bangkok',
  //charset : 'utf8'
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
connection.query = util.promisify(connection.query); //Set to display data from promise
module.exports = connection;
