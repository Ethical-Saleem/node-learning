const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(
    firstName,
    lastName,
    email,
    telephone,
    address,
    userCode,
    id,
    cart
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telephone = telephone;
    this.address = address;
    this.userCode = userCode;
    this._id = id;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("users")
        .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const productIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    let cartItems = [...this.cart.items];

    if (productIndex >= 0) {
      newQuantity = this.cart.items[productIndex].quantity + 1;
      cartItems[productIndex].quantity = newQuantity;
    } else {
      cartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = { items: cartItems };
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  deleteFromCart(productId) {
    const cartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: { items: cartItems } } }
    );
  }

  getCart() {
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });

    const db = getDb();
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((c) => {
              return c.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            firstName: this.firstName,
            lastName: this.lastName,
            userCode: this.userCode,
          },
        };
        db.collection("orders").insertOne(order);
      })
      .then((result) => {
        console.log(result);
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
