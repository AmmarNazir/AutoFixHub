const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload, // Import the multer upload middleware
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct); // Handle file uploads with multer
router.put("/:id", upload.single("image"), updateProduct); // Handle file uploads with multer
router.delete("/:id", deleteProduct);

module.exports = router;
