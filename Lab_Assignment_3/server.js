const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/products.route');
const adminRoutes= require('./routes/admin.route');
const methodOverride = require('method-override');
// const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
app.set('view engine', 'ejs');
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

app.get('/login',(req, res) => {
  res.render("./auth/login");
});

app.get('/register',(req, res) => {
  res.render("./auth/register");
});

app.get('/portfolio', (req, res) => {
  res.render('myPortfolio');
});

// Import Routes
app.use('/api/products', productRoutes);
app.use('/admin',adminRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
