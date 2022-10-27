'use strict';

class BaseController {
  model;

  constructor(model) {
    this.model = model;
  }

  findAll(req, res) {
    this.model.findAll(req, res);
  }

  findById(req, res) {
    this.model.findById(req.params.id, res);
  }

  create(req, res) {
    this.model.create(req.body, res);
  }

  update(req, res, fields) {
    let values = '';
    for (const field in fields) {
      values += `${field} = ${req.body[field]},`;
    }
    this.model.update(req.params.id, res, values);
  }

  delete(req, res) {
    this.model.delete(req.params.id, res);
  }
}

module.exports = BaseController;
