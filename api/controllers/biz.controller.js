'use strict';

const BaseController = require('./base.controller');

const BizModel = require('../models/biz.model');
const BizController = new BaseController(BizModel);

module.exports = BizController;
