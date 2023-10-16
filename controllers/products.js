const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll((products) => {
    res.render("shop/products", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.getProduct(id, product => {
    res.render("shop/product", {
        pageTitle: product.name,
        path: "/products",
        prod: product
    })
  });
};
