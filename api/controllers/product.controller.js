'use strict';

const BaseController = require('./base.controller');

const ProductModel = require('../models/product.model');
const ProductController = new BaseController(ProductModel);

module.exports = {
  findAll: (req, res) => ProductController.findAll(req, res),
  findById: (req, res) => ProductController.findById(req, res),
  create: (req, res) => ProductController.create(req, res),
  update: (req, res, fields) => ProductController.update(req, res, fields),
  delete: (req, res) => ProductController.delete(req, res)
};
