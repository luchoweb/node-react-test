'use strict';

const dbConn = require('../config/db.config');

class BaseModel {
  constructor(table) {
    this.table = table;
  }

  create(data, result) {
    dbConn.query(`INSERT INTO ${this.table} SET ?`, [data], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  findById(req, result) {
    dbConn.query(`SELECT * FROM ${this.table} WHERE id = ?`, [req.param.id], (err, res) => {
      const data = err || { res: res[0] };
      result.send(data);
    });
  }

  findAll(result) {
    dbConn.query(`SELECT * FROM ${this.table}`, (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  update(req, result, fields) {
    dbConn.query(`
        UPDATE ${this.table} SET ${fields}
        WHERE id = ?
      `,
      [req.param.id],
      (err, res) => {
        const data = err || res;
        result.send(data);
      }
    );
  }

  delete(req, result) {
    dbConn.query(`DELETE FROM ${this.table} WHERE id = ?`, [req.param.id], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }
}

module.exports = BaseModel;
