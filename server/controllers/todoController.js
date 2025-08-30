// server/controllers/todoController.js

const todoService = require('../services/todoService');

const getAllTodos = async (req, res) => {
  try {
    // Pass the user's ID and the entire query object to the service
    const todos = await todoService.findAllTodos(req.user._id, req.query);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.findTodoById(req.params.id, req.user._id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    // Pass the user's ID along with the todo data
    const todo = await todoService.addTodo({ text: req.body.text }, req.user._id);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 


const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await todoService.updateTodoById(req.params.id, req.user._id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await todoService.deleteTodoById(req.params.id, req.user._id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
};






