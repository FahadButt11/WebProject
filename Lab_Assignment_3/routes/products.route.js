const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/products.model');


// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save images
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${Date.now}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Route: Create Product
router.post('/products', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      category,
      images: req.files.map((file) => file.filename),
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully!', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
