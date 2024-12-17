const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/products.model');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Admin Dashboard
router.get('/dashboard', (req, res) => {
  res.render('./admin/dashboard',{body:"hello world"});
});

// View All Products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('./admin/products', { products });
});

// Create Product Form
router.get('/products/new', (req, res) => {
  res.render('./admin/create-product');
});

// Add Product
router.post('/products', upload.single('image'), async (req, res) => {
  const { title, description, price, stock } = req.body;
  const newProduct = new Product({
    title,
    description,
    price,
    stock,
    image: req.file.filename,
  });
  await newProduct.save();
  res.redirect('/admin/products');
});

// Edit Product Form
router.get('/products/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', { product });
});

// Update Product
router.put('/products/:id', upload.single('image'), async (req, res) => {
  const { title, description, price, stock } = req.body;
  const updateData = {
    title,
    description,
    price,
    stock,
  };
  if (req.file) updateData.image = req.file.filename; // Update image if uploaded
  await Product.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/admin/products');
});

// Delete Product
router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});

module.exports = router;
