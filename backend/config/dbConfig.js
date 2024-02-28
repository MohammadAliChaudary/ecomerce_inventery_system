const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecomerce_inventery_system",
});

module.exports = db;
