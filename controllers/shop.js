const Product = require("../models/products"); // importing the class model
const Cart = require("../models/cart")

exports.getIndex = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Home",
      path: "/",
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.getCart = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll((products) => {
    res.render("shop/cart", {
      pageTitle: "Cart",
      path: "/cart",
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.postCart = (req, res, next) => {
  // statically fetching all available products from the class model
  const id = req.body.productId
  Product.getProduct(id, (product) => {
    Cart.addProduct(id, product.amount)
  })
  res.redirect('/')
};
