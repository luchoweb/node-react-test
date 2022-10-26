'use strict';

const express = require('express');
const router = express.Router();

const BizController = require('../controllers/biz.controller');

// GET
router.get('/', (req, res) => BizController.findAll(req, res));
router.get('/:id', (req, res) => BizController.findById(req, res));

// POST
router.post('/', (req, res) => BizController.create(req, res));

// PUT
router.put('/:id', (req, res) => {
  const fields = '';
  BizController.update(req, res, fields);
});

// DELETE
router.delete('/:id', (req, res) => BizController.delete(req, res));

module.exports = router;
