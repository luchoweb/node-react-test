'use strict';

const BaseController = require('./base.controller');

const ProductModel = require('../models/product.model');
const ProductController = new BaseController(ProductModel);

module.exports = ProductController;
