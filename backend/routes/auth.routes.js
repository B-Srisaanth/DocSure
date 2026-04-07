const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile, getMe } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authMiddleware, getMe);

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', loginUser);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
