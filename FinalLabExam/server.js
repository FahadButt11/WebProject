const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const Product= require('./models/products.model');
const Order= require('./models/order.model');
const productRoutes = require('./routes/products.route');
const adminRoutes= require('./routes/admin.route');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
// const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
// app.use(cookieParser);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static("public"));
// app.use(expressLayouts);
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(methodOverride('_method'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.set("layout", "layouts/admin");
// Connect Database
connectDB();

// Middleware



// View Engine

// Serve static files (e.g., uploaded images)


// Routes
app.get('/', (req, res) => {
  res.render("landingPage");
});
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('products', { products });
});

app.get('/login',(req, res) => {
  res.render("./auth/login");
});

app.get('/register',(req, res) => {
  res.render("./auth/register");
});

app.get('/portfolio', (req, res) => {
  res.render('myPortfolio');
});
//add-to-cart
app.post('/add-to-cart', (req, res) => {
  const { productId, name, price } = req.body;
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  // Check if product already in cart
  const existingProductIndex = cart.findIndex(item => item.productId === productId);
  if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
  } else {
      cart.push({ productId, name, price, quantity: 1 });
  }
  console.log(cart);

  res.cookie('cart', JSON.stringify(cart));
  res.redirect('/cart');
});

//cart-page
app.get('/cart', (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.render('cart', { cart });
});

// Checkout Page
app.get('/checkout', (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.render('checkout', { cart });
});

// Confirm Order
app.post('/confirm-order', async (req, res) => {
  const { name, email, address } = req.body;
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  if (cart.length === 0) return res.redirect('/cart');

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const order = new Order({ name, email, address, cart, totalAmount });
  await order.save();

  res.clearCookie('cart');
  res.render('order_confirm');
});
app.get('/order-confirm', (req, res) => {
  res.render('order_confirm');
});

// app.get('/admin/orders', async (req, res) => {
//   const orders = await Order.find().sort({ createdAt: -1 });
//   res.render('admin_orders', { orders });
// });

// app.get("/cart", async (req, res) => {
//   let cart = req.cookies.cart;
//   cart = cart ? cart : [];
//   let products = await Product.find({ _id: { $in: cart } });
//   return res.render("cart", { products });
// });

// Import Routes
app.use('/api/products', productRoutes);
app.use('/admin',adminRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
