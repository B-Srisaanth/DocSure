const express = require('express');
const router = express.Router();
const { uploadDocument, getMyDocuments } = require('../controllers/document.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary.config');

// Require authentication for all document routes
router.use(authMiddleware);

// @route   POST /api/documents/upload
// @desc    Upload a new document
// @access  User only (Private)
router.post('/upload', upload.single('file'), uploadDocument);

// @route   GET /api/documents/my
// @desc    Get user's uploaded documents
// @access  User only (Private)
router.get('/my', getMyDocuments);

module.exports = router;
