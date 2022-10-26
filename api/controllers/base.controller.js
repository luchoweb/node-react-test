'use strict';

class BaseController {
  constructor(model) {
    this.model = model;
  }

  findAll(req, res) {
    this.model.findAll(res);
  }

  findById(req, res) {
    this.model.findById(req.params.id, res);
  }

  create(req, res) {
    this.model.create(req.body, res);
  }

  update(req, res, fields) {
    ProductModel.update(req, res, fields);
  }

  delete(req, res) {
    ProductModel.delete(req, res);
  }
}

module.exports = BaseController;
