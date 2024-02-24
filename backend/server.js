// server.js

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'todo',
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
