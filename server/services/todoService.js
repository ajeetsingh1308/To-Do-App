// server/services/todoService.js
const Todo = require('../models/Todo');

const findAllTodos = () => {
  return Todo.find().sort({ createdAt: -1 });
};

const findTodoById = (id) => {
  return Todo.findById(id);
};

const addTodo = (todoData) => {
  const todo = new Todo(todoData);
  return todo.save();
};

const updateTodoById = (id, updateData) => {
  return Todo.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTodoById = (id) => {
  return Todo.findByIdAndDelete(id);
};

module.exports = {
  findAllTodos,
  findTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
};