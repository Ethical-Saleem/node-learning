const mongodb = require('mongodb');
const getDb = require("../utils/database").getDb;

class Product {
  constructor(name, description, amount, imageUrl, id, userId) {
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id): null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(result => {
        console.log(result);
        return result
      })
      .catch((err) => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(productId)})
      .next()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Product;

// craete a function to save the new product object instance (Updating a Product)
// save() {
//   return db.execute(
//     'INSERT INTO products (productName, amount, description, imageUrl) VALUES (?, ?, ?, ?)',
//     [this.productName, this.amount, this.description, this.imageUrl]
//   )
// };
