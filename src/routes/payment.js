const express = require('express');
const router = express.Router();
const { initializeTransaction } = require('../services/paystack');
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/init', async (req, res) => {
  try {
    const { productId, email } = req.body;
    if (!productId || !email) return res.status(400).json({ error: 'Missing productId or email' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // amount should be in smallest unit expected by Paystack (e.g., NGN -> kobo)
    const amount = product.price; // assume price stored already in smallest unit

    // create local order with pending status
    const order = await Order.create({
      productId: product._id,
      amount,
      currency: product.currency,
      userEmail: email,
      status: 'pending'
    });

    // initialize paystack
    const psRes = await initializeTransaction({
      email,
      amount,
      metadata: { orderId: order._id.toString() }
    });

    if (psRes.status) {
      // update order with reference
      order.paystackReference = psRes.data.reference;
      await order.save();
      return res.json({ authorization_url: psRes.data.authorization_url });
    } else {
      return res.status(500).json({ error: 'Paystack initialize failed', details: psRes });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
