// server/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // 'sign' the token with the user's ID and our secret key
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will be valid for 30 days
  });
};

module.exports = generateToken;