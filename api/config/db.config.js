'use strict';

const mysql = require('mysql');

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWD,
  DATABASE_NAME,
  DATABASE_PORT
} = process.env;

const dbConn = mysql.createConnection({
  host     : DATABASE_HOST,
  user     : DATABASE_USER,
  password : DATABASE_PASSWD,
  database : DATABASE_NAME,
  port     : DATABASE_PORT
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
