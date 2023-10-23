const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Products",
        path: "admin/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  req.user
    .getProducts()
    .then((product) => {
      res.render("admin/product", {
        pageTitle: product.productName,
        path: "/products",
        prod: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  // use ".send" to send a response
  res.render("admin/new-product", {
    pageTitle: "New Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  // creating new product instance
  const name = req.body.productName;
  const description = req.body.description;
  const amount = req.body.amount;
  const image = req.body.imageUrl;
  const product = new Product(name, description, amount, image);
  product
    .save()
    .then((result) => {
      console.log("New Product Created");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  // gettign qury params if availaable
  const isEdit = req.query.edit;
  if (!isEdit) {
    return res.redirect("/admin/products");
  }
  const id = req.params.productId;
  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/admin/products");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: isEdit,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.body.productId;
  const updName = req.body.productName;
  const updDesc = req.body.description;
  const updAmnt = req.body.amount;
  const updImg = req.body.imageUrl;
  Product.findByPk(id)
    .then((product) => {
      product.productName = updName;
      product.description = updDesc;
      product.amount = updAmnt;
      product.imageUrl = updImg;
      return product.save();
    })
    .then((result) => {
      console.log("Product updated successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
