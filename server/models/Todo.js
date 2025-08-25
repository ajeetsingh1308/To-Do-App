// server/models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    // This creates the connection between a todo and a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // The 'ref' tells Mongoose which model this ID belongs to
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'], // Only allows one of these three values
      default: 'Medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      default: 'General',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Todo', todoSchema);