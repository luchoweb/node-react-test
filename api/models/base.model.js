'use strict';

const dbConn = require('../config/db.config');

class BaseModel {
  table;

  constructor(table) {
    this.table = table;
  }

  create(data, result) {
    dbConn.query(`INSERT INTO ${this.table} SET ?`, [data], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  findById(id, result) {
    dbConn.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id], (err, res) => {
      const data = err || { res: res[0] };
      result.send(data);
    });
  }

  findByBizId(biz_id, result) {
    dbConn.query(`SELECT * FROM ${this.table} WHERE biz_id = ?`, [biz_id], (err, res) => {
      const data = err || { res: res };
      result.send(data);
    });
  }

  findAll(req, result) {
    dbConn.query(`SELECT * FROM ${this.table}`, (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  update(id, result, values) {
    dbConn.query(`UPDATE ${this.table} SET ${values} WHERE id = ?`,
      [id],
      (err, res) => {
        const data = err || res;
        result.send(data);
      }
    );
  }

  delete(id, result) {
    dbConn.query(`DELETE FROM ${this.table} WHERE id = ?`, [id], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }
}

module.exports = BaseModel;
