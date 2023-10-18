const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../utils/database")

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
})

module.exports = Product;

// craete a function to save the new product object instance (Updating a Product)
  // save() {
  //   return db.execute(
  //     'INSERT INTO products (productName, amount, description, imageUrl) VALUES (?, ?, ?, ?)',
  //     [this.productName, this.amount, this.description, this.imageUrl]
  //   )
  // };
