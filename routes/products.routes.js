const express = require('express');

const productsController = require('../controllers/products.controller')

router = express.Router();

router.get('/products' , productsController.getAllProducts);

router.get('/products/:id', productsController.getProdctDetails);

module.exports = router;