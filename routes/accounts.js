const express = require('express');
const Account = require('../models/Account');
const router = express.Router();

// Get all accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.find({}, '-password');
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
