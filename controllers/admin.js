const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.getProduct(id, (product) => {
    res.render("admin/product", {
      pageTitle: product.name,
      path: "/products",
      prod: product,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  // use ".send" to send a response
  res.render("admin/new-product", {
    pageTitle: "New Product",
    path: "/admin/new-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  // creating new product instance
  const product = new Product(
    req.body.name,
    req.body.description,
    req.body.amount,
    req.body.imgUrl
  );
  product.save(); // saving the product using the "saveAll" function declared in the model
  res.redirect("/"); // for redirecting
};
