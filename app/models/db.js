const mysql = require("mysql");
const dbConfig = require("../../dbConfig.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.database.host,
  user: dbConfig.database.user,
  password: dbConfig.database.password,
  database: dbConfig.database.database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;