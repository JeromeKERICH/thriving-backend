const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userEmail: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  amount: Number,
  currency: String,
  paystackReference: String,
  status: { type: String, enum: ['pending','success','failed'], default: 'pending' },
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
