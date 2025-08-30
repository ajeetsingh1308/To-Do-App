// server/services/todoService.js
const Todo = require('../models/Todo');

// Find all todos belonging to a specific user
// NEW: Updated function to handle filtering, sorting, and searching
const findAllTodos = (userId, query) => {
  // 1. Build the filter object based on query params
  const filter = { user: userId };

  if (query.completed) {
    filter.completed = query.completed === 'true'; // Convert string 'true'/'false' to boolean
  }
  if (query.priority) {
    filter.priority = query.priority;
  }
  if (query.search) {
    // Use a regular expression for case-insensitive text search
    filter.text = { $regex: query.search, $options: 'i' };
  }

  // 2. Build the sort object
  let sort = { createdAt: -1 }; // Default sort: newest first
  if (query.sortBy) {
    const parts = query.sortBy.split(':'); // e.g., "dueDate:asc" -> ["dueDate", "asc"]
    sort = { [parts[0]]: parts[1] === 'desc' ? -1 : 1 };
  }
  
  // 3. Execute the query with the filter and sort options
  return Todo.find(filter).sort(sort);
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

