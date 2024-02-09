const Product = require("../models/products"); // importing the class model
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: "Home",
        path: "/",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  // statically fetching all available products from the class model
  const id = req.body.productId;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.removeFromCart = (req, res, next) => {
  const id = req.body.productId;
  return req.user
    .deleteFromCart(id)
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getOrder = (req, res, next) => {
  const id = req.user._id;
  Order.find({ userId: id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          product: { ...item.product._doc },
          quantity: item.quantity,
        };
      });

      const order = new Order({
        items: products,
        user: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          userCode: req.user.userCode,
        },
        userId: req.user,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
