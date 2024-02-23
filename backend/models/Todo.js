// models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', todoSchema);