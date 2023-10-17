const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

const Cart = require("../models/cart")

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
  constructor(id, title, desc, amount, imgUrl) {
    this.id = id;
    this.name = title;
    this.description = desc;
    this.amount = amount;
    this.imgUrl = imgUrl;
  }

  // craete a function to save the new product object instance (Updating a Product)
  save() {
    getProductFromFile((products) => {
      // check if a product exist by its Id and Index location
      if (this.id) {
        const extProductIndex = products.findIndex(p => p.id === this.id)
        const updProducts = [...products];
        updProducts[extProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updProducts), (err) => {
          console.log(err);
        });
      } else { // if product doesnt exist, create new one (Posting New Product)
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  // delete(id) {
  //   getProductFromFile((products) => {
  //     if (id) {
  //       const allProducts = products
  //       const extProductIndex = allProducts.findIndex(p => p.id === id)
  //       if (extProductIndex > -1) {
  //         const updProducts = [...products];
  //         updProducts.splice(extProductIndex, 1)
  //         fs.writeFile(p, JSON.stringify(updProducts), (err) => {
  //           console.log(err);
  //         });
  //       };
  //       return allProducts;
  //     } else {
  //       console.log("Product could not be found")
  //     }
  //   })
  // }

  static deleteById(id) {
    console.log(id)
    getProductFromFile((products) => {
      const prod = products.find((p) => p.id === id);
      const updProducts = products.filter(p => p.id !== id)
      console.log(updProducts)
      fs.writeFile(p, JSON.stringify(updProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, prod.amount)
        }
      });
    })
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
