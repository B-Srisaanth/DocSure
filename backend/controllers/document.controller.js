const Document = require('../models/document.model');
const sendEmail = require('../utils/email');
const User = require('../models/user.model');

// Upload Document
const uploadDocument = async (req, res, next) => {
  try {
    const { title, type } = req.body;
    
    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }
    
    // Create new document in DB
    const newDocument = await Document.create({
      userId: req.user._id,
      title,
      type,
      fileUrl: req.file.path, // Cloudinary file URL
      cloudinaryId: req.file.filename, // Cloudinary public_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      document: newDocument,
    });
  } catch (err) {
    next(err);
  }
};

// Get My Documents (User only)
const getMyDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ userId: req.user._id }).sort({ uploadedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Documents (Admin only with Pagination & Search)
const getAllDocuments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = {};
    if (search) {
      // Find users matching search first (slow but simple)
      const users = await User.find({ name: { $regex: search, $options: 'i' } }).select('_id');
      const userIds = users.map(u => u._id);
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { type: { $regex: search, $options: 'i' } },
          { userId: { $in: userIds } }
        ]
      };
    }

    const total = await Document.countDocuments(query);
    const documents = await Document.find(query)
      .populate('userId', 'name email')
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: documents.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      documents,
    });
  } catch (err) {
    next(err);
  }
};

// Update Document Status (Admin only)
const updateDocumentStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const documentId = req.params.id;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    // Update document in DB
    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      { status, remarks },
      { new: true, runValidators: true }
    );
    
    if (!updatedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // SEND NOTIFICATION EMAIL (ASYNC)
    try {
      const user = await User.findById(updatedDocument.userId);
      await sendEmail({
        email: user.email,
        subject: `Document Verification Status: ${status.toUpperCase()}`,
        message: `Hello ${user.name},\n\nYour document "${updatedDocument.title}" (${updatedDocument.type}) has been ${status}.\n\n${remarks ? `Remarks: ${remarks}\n\n` : ''}Please login to your dashboard for more details.\n\nBest regards,\nVerifyPro Team`,
      });
    } catch (emailErr) {
      console.error('❌ Email could not be sent:', emailErr);
      // Don't error out the whole request just because email failed
    }
    
    res.status(200).json({
      success: true,
      message: `Document ${status} successfully`,
      document: updatedDocument,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadDocument, getMyDocuments, getAllDocuments, updateDocumentStatus };
