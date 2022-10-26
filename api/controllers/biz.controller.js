'use strict';

const BizModel = require('../models/biz.model');

class BizController {
  static findAll(req, res) {
    BizModel.findAll(res);
  }

  static findById(req, res) {
    BizModel.findById(req.params.id, res);
  }

  static create(req, res) {
    const biz = new BizModel(req.body);
    BizModel.create(biz, res);
  }

  static update(req, res) {
    const biz = new BizModel(req.body);
    BizModel.update(req.params.id, biz, res);
  }

  static delete(req, res) {
    BizModel.delete(req.params.id, res);
  }
}

module.exports = BizController;
