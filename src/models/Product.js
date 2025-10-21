const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number, // in kobo/ cents depending on Paystack config (Paystack expects amount in kobo if NGN)
  currency: { type: String, default: 'KES' },
  published: { type: Boolean, default: false }
});
module.exports = mongoose.model('Product', productSchema);
