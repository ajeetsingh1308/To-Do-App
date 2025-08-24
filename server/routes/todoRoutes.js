// server/routes/todos.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Define routes
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;