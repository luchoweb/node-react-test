'use strict';

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

// GET
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);
router.get('/biz/:id', ProductController.findByBizId);

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
