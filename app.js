require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const accountsRoutes = require('./routes/accounts');
const chatsRoutes = require('./routes/chats');
const messagesRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(accountsRoutes);
app.use(chatsRoutes);
app.use(messagesRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
