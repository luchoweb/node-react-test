'use strict';

const express = require('express');
const router = express.Router();

const BizController = require('../controllers/biz.controller');

// GET
router.get('/', BizController.findAll);
router.get('/:id', BizController.findById);

// POST
router.post('/', BizController.create);

// PUT
router.put('/:id', BizController.update);

// DELETE
router.delete('/:id', BizController.delete);

module.exports = router;
