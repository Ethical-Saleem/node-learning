const getDb = require("../utils/database").getDb;

class Product {
  constructor(name, description, amount, imageUrl) {
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb;
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  fetchAll() {
    const db = getDb;
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
}

module.exports = Product;

// craete a function to save the new product object instance (Updating a Product)
// save() {
//   return db.execute(
//     'INSERT INTO products (productName, amount, description, imageUrl) VALUES (?, ?, ?, ?)',
//     [this.productName, this.amount, this.description, this.imageUrl]
//   )
// };
