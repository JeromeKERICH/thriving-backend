const fetch = require('node-fetch');
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

async function initializeTransaction({ email, amount, metadata = {} }) {
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, amount, metadata, callback_url: `${process.env.FRONTEND_URL}/payment/complete` })
  });
  return res.json();
}

async function verifyTransaction(reference) {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
  });
  return res.json();
}

module.exports = { initializeTransaction, verifyTransaction };
