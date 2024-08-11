// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Please upload an image'), false);
  }
  cb(null, true);
};

// Maximum file size (in bytes)
const limits = {
  fileSize: 5 * 1024 * 1024, // 1MB
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
