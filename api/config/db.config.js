'use strict';

const mysql = require('mysql');

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWD,
  DATABASE_NAME
} = process.env;

const dbConn = mysql.createConnection({
  host     : DATABASE_HOST,
  user     : DATABASE_USER,
  password : DATABASE_PASSWD,
  database : DATABASE_NAME
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
