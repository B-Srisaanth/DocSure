const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'document_verification', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf'],
    transformation: [{ width: 1000, crop: 'limit' }], // Limit image size
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
