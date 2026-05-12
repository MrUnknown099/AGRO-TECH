const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define the routes and map them to controller functions

// POST request to /api/auth/register will call the 'register' function
router.post('/register', register);

// POST request to /api/auth/login will call the 'login' function
router.post('/login', login);

module.exports = router;