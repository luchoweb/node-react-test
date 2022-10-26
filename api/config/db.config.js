'use strict';

const mysql = require('mysql');

const {
  DATABASE_HOST: host,
  DATABASE_USER: user,
  DATABASE_PASSWD: password,
  DATABASE_NAME: database,
  DATABASE_PORT: port
} = process.env;

const dbConn = mysql.createConnection({host, user, password, database, port});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("MySQL connected!");
});

module.exports = dbConn;
