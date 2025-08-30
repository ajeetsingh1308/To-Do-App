// server/controllers/userController.js
const userService = require('../services/userService');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.registerUser({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Send back a token
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(401).json({ message: error.message }); // 401 Unauthorized
  }
};

const getUserProfile = async (req, res) => {
  try {
    // The user is attached to the request object by our 'protect' middleware
    const user = await userService.findUserById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.user._id, { name: req.body.name });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
const updateUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        await userService.updateUserPassword(req.user._id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
  register,
  login, // Export the new function
  getUserProfile,     // Export new functions
  updateUserProfile,
  updateUserPassword,
};
