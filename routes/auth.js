const express = require('express');
const bcrypt = require('bcryptjs');
const Account = require('../models/Account');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { phoneNumber, password, name } = req.body;
    const existing = await Account.findOne({ phoneNumber });
    if (existing) return res.status(400).json({ error: 'Account exists' });
    const hashed = await bcrypt.hash(password, 10);
    const account = new Account({ phoneNumber, password: hashed, name });
    await account.save();
    res.json({ message: 'Registered', account });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const account = await Account.findOne({ phoneNumber });
    if (!account) return res.status(400).json({ error: 'Account not found' });
    const valid = await bcrypt.compare(password, account.password);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });
    res.json({ message: 'Login successful', account });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
