require("dotenv").config();

// Get the client
const mysql = require("mysql2/promise");

// Create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

module.exports = { pool };
