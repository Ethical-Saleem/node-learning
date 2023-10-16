const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

// create an helper function to read file
const getProductFromFile = (prod) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      prod([]);
    } else {
      prod(JSON.parse(data));
    }
  });
};

// creating a class model
module.exports = class Product {
  // create a constructor function to accept params that will be used to create product object
  constructor(title, desc, amount, imgUrl) {
    this.name = title;
    this.description = desc;
    this.amount = amount;
    this.imgUrl = imgUrl;
  }

  // craete a function to save the new product object instance
  save() {
    this.id = Math.random().toString();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // function to call all products available
  // "static" is used because there is no change to be made when fethcing the products
  static fetchAll(prod) {
    getProductFromFile(prod);
  }

  static getProduct(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
