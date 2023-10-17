const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const c = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(c, (err, data) => {
      const cart = JSON.parse(data);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    // fetching the previous cart
    fs.readFile(c, (err, data) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(data);
      }
      // analyzing the cart, to check if existing product
      const extProductIndex = cart.products.findIndex((p) => p.id === id); // getting the index of the particular product
      const extProduct = cart.products[extProductIndex];
      let updProduct;
      // add new product / increase quantity
      if (extProduct) {
        updProduct = { ...extProduct };
        updProduct.qty = updProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[extProductIndex] = updProduct;
      } else {
        updProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(c, JSON.stringify(cart), (err) => {
        console.log("cart error", err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(c, (err, data) => {
      if (err) {
        return;
      }
      const updCart = { ...JSON.parse(data) };
      const product = updCart.products.find((p) => p.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updCart.products = updCart.products.filter((p) => p.id !== id);
      updCart.totalPrice = updCart.totalPrice - productPrice * productQty;
      fs.writeFile(c, JSON.stringify(updCart), (err) => {
        console.log("cart error", err);
      });
    });
  }
};
