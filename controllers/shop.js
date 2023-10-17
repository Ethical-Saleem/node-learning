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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (p of products) {
        const cartProductData = cart.products.find(
          prod=> prod.id === p.id
        )
        if (cartProductData) {
          cartProducts.push({
            productData: p,
            quantity: cartProductData.qty
          })
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  })
};

exports.postCart = (req, res, next) => {
  // statically fetching all available products from the class model
  const id = req.body.productId
  Product.getProduct(id, (product) => {
    Cart.addProduct(id, product.amount)
  })
  res.redirect('/')
};

exports.removeFromCart = (req, res, next) => {
  const id = req.body.productId
  Product.getProduct(id, product => {
    Cart.deleteProduct(id, product.amount);
    res.redirect('/cart')
  })
}
