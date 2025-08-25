// server/services/todoService.js
const Todo = require('../models/Todo');

// Find all todos belonging to a specific user
const findAllTodos = (userId) => {
  return Todo.find({ user: userId }).sort({ createdAt: -1 });
};

// Find a single todo by its ID and user ID
const findTodoById = (id, userId) => {
  return Todo.findOne({ _id: id, user: userId });
};

// Add a new todo, associating it with a user
const addTodo = (todoData, userId) => {
  const todo = new Todo({
    ...todoData,
    user: userId, // Set the user field
  });
  return todo.save();
};

// Find a todo by its ID and user ID, then update it
const updateTodoById = (id, userId, updateData) => {
  return Todo.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true });
};

// Find a todo by its ID and user ID, then delete it
const deleteTodoById = (id, userId) => {
  return Todo.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
  findAllTodos,
  findTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
};

