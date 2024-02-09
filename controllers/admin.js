const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.findById(id)
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
  const quantity = req.body.quantity;
  const product = new Product({
    name: name,
    description: description,
    amount: amount,
    imageUrl: image,
    quantity: quantity,
    userId: req.user
  });
  product
    .save()
    .then((result) => {
      console.log("New Produc Created");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  // gettign query params if availaable
  const isEdit = req.query.edit;
  if (!isEdit) {
    return res.redirect("/admin/products");
  }
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
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
  const updQty = req.body.quantity;

  Product.findById(id)
    .then((product) => {
      product.name = updName;
      product.description = updDesc;
      product.amount = parseFloat(updAmnt);
      product.imageUrl = updImg;
      product.quantity = parseFloat(updQty);

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
  Product.findByIdAndDelete(id)
    .then((result) => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
