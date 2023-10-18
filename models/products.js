// connecting to the sql database pool
const db = require("../utils/database")

const Cart = require("../models/cart")

// creating a class model
module.exports = class Product {
  // create a constructor function to accept params that will be used to create product object
  constructor(id, title, desc, amount, imgUrl) {
    this.id = id;
    this.productName = title;
    this.description = desc;
    this.amount = amount;
    this.imageUrl = imgUrl;
  }

  // craete a function to save the new product object instance (Updating a Product)
  save() {
    return db.execute(
      'INSERT INTO products (productName, amount, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.productName, this.amount, this.description, this.imageUrl]
    )
  };

  static deleteById(id) {
  }

  // function to call all products available
  // "static" is used because there is no change to be made when fethcing the products
  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static getProduct(id) {
    return db.execute(
      'SELECT * FROM products WHERE products.id = ?', [id]
    )
  }
};
