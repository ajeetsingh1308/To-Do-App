// server/routes/todos.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware'); // Import our middleware

// Add the 'protect' middleware to each route
// This means a user must be logged in to access any of these endpoints
router.get('/', protect, todoController.getAllTodos);
router.get('/:id', protect, todoController.getTodoById);
router.post('/', protect, todoController.createTodo);
router.put('/:id', protect, todoController.updateTodo);
router.delete('/:id', protect, todoController.deleteTodo);

module.exports = router;