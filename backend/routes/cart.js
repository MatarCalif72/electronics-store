const express = require('express');
const router = express.Router();
const db = require('../db');

// GET cart items for a session
router.get('/:sessionId', (req, res) => {
  const items = db.get('cartItems').filter({ session_id: req.params.sessionId }).value();
  const enriched = items.map(item => {
    const product = db.get('products').find({ id: item.product_id }).value() || {};
    return { ...item, name: product.name, price: product.price, image: product.image, category: product.category };
  });
  res.json(enriched);
});

// POST add item to cart
router.post('/:sessionId', (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'product_id is required' });

  const product = db.get('products').find({ id: Number(product_id) }).value();
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const existing = db.get('cartItems').find({ session_id: req.params.sessionId, product_id: Number(product_id) }).value();
  if (existing) {
    db.get('cartItems').find({ id: existing.id }).assign({ quantity: existing.quantity + quantity }).write();
  } else {
    const id = db.get('nextCartId').value();
    db.get('cartItems').push({ id, session_id: req.params.sessionId, product_id: Number(product_id), quantity }).write();
    db.set('nextCartId', id + 1).write();
  }
  res.json({ message: 'Item added to cart' });
});

// PUT update item quantity
router.put('/:sessionId/:itemId', (req, res) => {
  const { quantity } = req.body;
  const id = Number(req.params.itemId);
  if (quantity <= 0) {
    db.get('cartItems').remove({ id, session_id: req.params.sessionId }).write();
    return res.json({ message: 'Item removed' });
  }
  db.get('cartItems').find({ id, session_id: req.params.sessionId }).assign({ quantity }).write();
  res.json({ message: 'Cart updated' });
});

// DELETE remove item
router.delete('/:sessionId/:itemId', (req, res) => {
  db.get('cartItems').remove({ id: Number(req.params.itemId), session_id: req.params.sessionId }).write();
  res.json({ message: 'Item removed' });
});

// DELETE clear cart
router.delete('/:sessionId', (req, res) => {
  db.get('cartItems').remove({ session_id: req.params.sessionId }).write();
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
