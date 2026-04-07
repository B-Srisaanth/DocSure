const express = require('express');
const router = express.Router();
const { getAllDocuments, updateDocumentStatus } = require('../controllers/document.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Require authentication and admin role for all admin routes
router.use(authMiddleware, roleMiddleware);

// @route   GET /api/admin/documents
// @desc    Get all uploaded documents (Admin Dashboard)
// @access  Admin only (Private)
router.get('/documents', getAllDocuments);

// @route   PUT /api/admin/document/:id
// @desc    Approve/Reject a document with remarks
// @access  Admin only (Private)
router.put('/document/:id', updateDocumentStatus);

module.exports = router;
