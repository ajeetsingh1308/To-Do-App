// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the request has a token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get the token from the header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user by the ID that was in the token
      // Attach the user object to the request, but exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Move on to the next function (the actual route controller)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };