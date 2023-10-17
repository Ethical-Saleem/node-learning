const path = require("path");

const express = require("express");

// importing controllers
const productController = require("../controllers/products");
const adminController = require("../controllers/admin");

const router = express.Router(); // Declare an express router

router.get('/new-product', adminController.getAddProduct); // using controllers

router.get('/products', adminController.getProducts);

router.get('/products/:productId', adminController.getProduct)

router.get('/edit-product/:productId', adminController.getEditProduct);

// This middleware will only run for "POST" requests
router.post('/postProduct', adminController.postAddProduct);

router.post('/updateProduct', adminController.updateProduct);

router.post('/deleteProduct', adminController.deleteProduct);

module.exports = router;
// exports.products = products;

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
