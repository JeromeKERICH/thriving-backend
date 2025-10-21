const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Order = require('../models/Order');
const { verifyTransaction } = require('../services/paystack');
const { sendEmail } = require('../services/resend');

function verifyPaystackSignature(rawBody, signature) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET;
  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  return hash === signature;
}

// use raw body parser for webhook in index.js or this router
router.post('/paystack', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const sig = req.headers['x-paystack-signature'];
    const raw = req.body; // Buffer
    const bodyString = raw.toString();

    if (!verifyPaystackSignature(bodyString, sig)) {
      console.warn('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const payload = JSON.parse(bodyString);
    const event = payload.event;
    const data = payload.data;

    if (event === 'charge.success' || event === 'transaction.success') {
      const reference = data.reference;
      // double-check with verify endpoint
      const verification = await verifyTransaction(reference);
      if (!verification.status) {
        console.warn('Paystack verify failed', verification);
        return res.status(400).send('Verification failed');
      }

      const metadata = verification.data.metadata || {};
      const orderId = metadata.orderId;

      if (!orderId) {
        // fallback: find by reference
        const order = await Order.findOne({ paystackReference: reference });
        if (!order) return res.status(404).send('Order not found');
        order.status = 'success';
        await order.save();

        // send emails: to user and admin
        await sendEmail({
          to: order.userEmail,
          subject: `Payment Success – ${order._id}`,
          html: `<p>Thanks! Your payment for ${order.productId} was successful. Reference: ${reference}</p>`
        });

        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Order Paid – ${order._id}`,
          html: `<p>Order ${order._id} was paid. Reference: ${reference}</p>`
        });

        return res.sendStatus(200);
      }

      // update order
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).send('Order not found');
      order.status = 'success';
      order.paystackReference = reference;
      await order.save();

      // send transactional email to buyer with any download links or access info
      await sendEmail({
        to: order.userEmail,
        subject: 'Payment Confirmed — Thriving Moms',
        html: `<p>Hi — we’ve confirmed your payment for product. Thank you! Reference: ${reference}</p>`
      });

      // notify admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New payment received',
        html: `<p>Order ${order._id} paid by ${order.userEmail}. Reference: ${reference}</p>`
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
