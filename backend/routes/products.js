const express = require('express');
const router = express.Router();
const db = require('../db');

// GET total product count
router.get('/count', (req, res) => {
  const count = db.get('products').size().value();
  res.json({ count });
});

// GET all products with optional search and category filter
router.get('/', (req, res) => {
  const { search, category } = req.query;
  let products = db.get('products').value();

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
    );
  }
  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }
  res.json(products);
});

// GET categories
router.get('/categories', (req, res) => {
  const cats = [...new Set(db.get('products').map('category').value())].sort();
  res.json(['All', ...cats]);
});

// GET single product
router.get('/:id', (req, res) => {
  const product = db.get('products').find({ id: Number(req.params.id) }).value();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product
router.post('/', (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'name, price, category are required' });
  }
  const id = db.get('nextProductId').value();
  const product = { id, name, description: description || '', price: Number(price), category, image: image || '', stock: stock || 0, created_at: new Date().toISOString() };
  db.get('products').push(product).write();
  db.set('nextProductId', id + 1).write();
  res.status(201).json(product);
});

// PUT update product
router.put('/:id', (req, res) => {
  const product = db.get('products').find({ id: Number(req.params.id) }).value();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const updated = { ...product, ...req.body, id: product.id };
  db.get('products').find({ id: product.id }).assign(updated).write();
  res.json(updated);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const product = db.get('products').find({ id: Number(req.params.id) }).value();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  db.get('products').remove({ id: product.id }).write();
  res.json({ message: 'Product deleted' });
});

module.exports = router;
