const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userCode: { type: String, required: true }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
