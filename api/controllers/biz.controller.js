'use strict';

const BaseController = require('./base.controller');

const BizModel = require('../models/biz.model');
const BizController = new BaseController(BizModel);

module.exports = {
  findAll: (req, res) => BizController.findAll(req, res),
  findById: (req, res) => BizController.findById(req, res),
  create: (req, res) => BizController.create(req, res),
  update: (req, res, fields) => BizController.update(req, res, fields),
  delete: (req, res) => BizController.delete(req, res)
};
