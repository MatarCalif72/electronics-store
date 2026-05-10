const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'electronics-store-secret-2024';

// POST register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, password are required' });
  }
  const existing = db.get('users').find({ email }).value();
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const id = db.get('nextUserId').value();
  const hashed = bcrypt.hashSync(password, 10);
  const user = { id, name, email, password: hashed, created_at: new Date().toISOString() };
  db.get('users').push(user).write();
  db.set('nextUserId', id + 1).write();

  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id, name, email } });
});

// POST login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = db.get('users').find({ email }).value();
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
