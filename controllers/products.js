const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll()
    .then(([rows, meta]) => {
      res.render("shop/index", {
        pageTitle: "Home",
        path: "/",
        prods: rows
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.getProduct(id)
    .then(([product]) => {
      res.render("shop/product", {
        pageTitle: product[0].name,
        path: "/products",
        prod: product[0],
      });
    })
    .catch(err => console.log(err))
};
