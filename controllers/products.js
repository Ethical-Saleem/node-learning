const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/products", {
        pageTitle: "Products",
        path: "/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findByPk(id)
    .then(product => {
      res.render("shop/product", {
        pageTitle: product.productName,
        path: "/products",
        prod: product,
      });
    })
    .catch(err => console.log(err))
};
