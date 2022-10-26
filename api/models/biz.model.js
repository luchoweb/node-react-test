'use strict';

const dbConn = require('../config/db.config');
const tableName = 'businesses';

class Biz {
  constructor(biz) {
    this.name = biz.name;
    this.description = biz.description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(biz, result) {
    dbConn.query(`INSERT INTO ${tableName} set ?`, [biz], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  static findById(id, result) {
    dbConn.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
      const data = err || { biz: res[0] };
      result.send(data);
    });
  }

  static findAll(result) {
    dbConn.query(`SELECT * FROM ${tableName}`, (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }

  static update(id, biz, result) {
    dbConn.query(
      `UPDATE ${tableName} SET 
      name = ?, description = ?, updatedAt = ? 
      WHERE id = ?`,
      [biz.name, biz.description, new Date(), id],
      (err, res) => {
        const data = err || res;
        result.send(data);
      }
    );
  }

  static delete(id, result) {
    dbConn.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
      const data = err || res;
      result.send(data);
    });
  }
}

module.exports = Biz;
