const path = require("path");

const express = require("express");

const productController = require("../controllers/products");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', productController.getProducts);

router.get('/products/:productId', productController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout');

module.exports = router;

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
