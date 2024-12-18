const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  cart: [{
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number
  }],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
