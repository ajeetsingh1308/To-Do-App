// server/services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // 1. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with that email already exists');
  }

  // 2. Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create and save the new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  return user.save();
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // 1. Find the user by email
  const user = await User.findOne({ email });

  // 2. If user exists, compare the submitted password with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    return user; // Return user object if password matches
  } else {
    throw new Error('Invalid email or password');
  }
};

const findUserById = (id) => {
  // Find a user by their ID, excluding the password field from the result
  return User.findById(id).select('-password');
};

const updateUserProfile = (id, updateData) => {
  // Find a user by ID and update their details
  return User.findByIdAndUpdate(id, { name: updateData.name }, { new: true }).select('-password');
};

const updateUserPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);

  // 1. Verify the old password is correct
  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 3. Save the user with the new password
    await user.save();
    return true; // Indicate success
  } else {
    throw new Error('Invalid old password');
  }
};

module.exports = {
  registerUser,
  loginUser, // Export the new function
  findUserById,       // Export new functions
  updateUserProfile,
  updateUserPassword,
};

