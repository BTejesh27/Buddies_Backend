const express = require('express');
const Chat = require('../models/Chat');
const Account = require('../models/Account');
const Message = require('../models/Message');
const router = express.Router();

// Send message
router.post('/messages', async (req, res) => {
  try {
    const { senderId, receiverId, content, type } = req.body;
    // senderId and receiverId are phone numbers
    const sender = await Account.findOne({ phoneNumber: senderId });
    const receiver = await Account.findOne({ phoneNumber: receiverId });
    if (!sender || !receiver) return res.status(404).json({ error: 'Account not found' });
    let chat = await Chat.findOne({ participants: { $all: [sender._id, receiver._id] } });
    if (!chat) {
      chat = new Chat({ participants: [sender._id, receiver._id], messages: [] });
      await chat.save();
    }
    const message = new Message({ senderId: sender._id, receiverId: receiver._id, content, type });
    await message.save();
    chat.messages.push(message._id);
    await chat.save();
    res.json({ message: 'Message sent', messageObj: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
