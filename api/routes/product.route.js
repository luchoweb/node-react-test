'use strict';

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

// GET
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);

// POST
router.post('/', ProductController.create);

// PUT
router.put('/:id', (req, res) => {
  const fields = ['name', 'price', 'stock', 'biz_id'];
  ProductController.update(req, res, fields);
});

// DELETE
router.delete('/:id', ProductController.delete);

module.exports = router;
