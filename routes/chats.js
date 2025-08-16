const express = require('express');
const Chat = require('../models/Chat');
const Account = require('../models/Account');
const Message = require('../models/Message');
const router = express.Router();

// Get chats between two accounts
router.get('/chats/:loginPhoneNumber/:chattingAccountNumber', async (req, res) => {
  try {
    const { loginPhoneNumber, chattingAccountNumber } = req.params;
    const acc1 = await Account.findOne({ phoneNumber: loginPhoneNumber });
    const acc2 = await Account.findOne({ phoneNumber: chattingAccountNumber });
    if (!acc1 || !acc2) return res.status(404).json({ error: 'Account not found' });
    const chat = await Chat.findOne({ participants: { $all: [acc1._id, acc2._id] } }).populate({
      path: 'messages',
      populate: { path: 'senderId receiverId', select: 'phoneNumber name' }
    });
    if (!chat) return res.json({ messages: [] });
    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
