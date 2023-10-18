const Product = require("../models/products"); // importing the class model

exports.getProducts = (req, res, next) => {
  // statically fetching all available products from the class model
  Product.fetchAll()
    .then(([rows]) => {
      res.render("admin/products", {
        pageTitle: "Products",
        path: "admin/products",
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
      res.render("admin/product", {
        pageTitle: product[0].name,
        path: "/products",
        prod: product[0],
      });
    })
    .catch(err => console.log(err))
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
  const id = null;
  const name = req.body.productName;
  const description = req.body.description;
  const amount = req.body.amount;
  const image = req.body.imageUrl;
  const product = new Product(
    id,
    name,
    description,
    amount,
    image
  );
  product
    .save()
    .then(rest => {
      res.redirect("/admin/products")
    })
    .catch(err => {
      console.log(err)
    }); // saving the product using the "saveAll" function declared in the model
};

exports.getEditProduct = (req, res, next) => {
  // gettign qury params if availaable
  const isEdit = req.query.edit;
  if (!isEdit) {
    return res.redirect("/admin/products");
  }
  const id = req.params.productId;
  Product.getProduct(id, (product) => {
    if (!product) {
      return res.redirect("/admin/products");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: isEdit,
      product: product,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const id = req.body.productId;
  const updName = req.body.name;
  const updDesc = req.body.description;
  const updAmnt = req.body.amount;
  const updImg = req.body.imgUrl;
  const updProduct = new Product(
    id,
    updName,
    updDesc,
    updAmnt,
    updImg,
  )
  updProduct.save();
  res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.deleteById(id);
  res.redirect('/admin/products')
}
