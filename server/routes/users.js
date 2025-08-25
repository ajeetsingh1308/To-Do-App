// server/routes/users.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController'); // Import login

router.post('/register', register);
router.post('/login', login); // Add the new login route

module.exports = router;
