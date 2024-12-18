const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/products.route');
const adminRoutes= require('./routes/admin.route');
const methodOverride = require('method-override');
const app = express();
var expressLayouts = require("express-ejs-layouts");
let Product = require("./models/products.model");
let User = require("./models/user.model");
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(methodOverride('_method'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
let session = require("express-session");
app.use(session({ secret: "my session secret" }));

let siteMiddleware = require("./middlewares/site-middleware");
let authMiddleware = require("./middlewares/auth-middleware");
// const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize Express App


// app.set("layout", "layouts/admin");
// Connect Database
connectDB();

// Middleware



// View Engine

// Serve static files (e.g., uploaded images)


// Routes
app.get("/about-me", authMiddleware, (req, res) => {
  return res.render("about-me");
});
app.get("/logout", async (req, res) => {
  req.session.user = null;
  return res.redirect("/login");
});
app.get("/login", async (req, res) => {
  return res.render("auth/login");
});
app.post("/login", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });
  if (!user) return res.redirect("/register");
  isValid = user.password == data.password;
  if (!isValid) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});
app.get("/register", async (req, res) => {
  return res.render("auth/register");
});
app.post("/register", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });
  if (user) return res.redirect("/register");
  user = new User(data);
  await user.save();
  return res.redirect("/login");
});

app.get('/', (req, res) => {
  res.render("landingPage");
});

app.get('/portfolio', (req, res) => {
  res.render('myPortfolio');
});

let adminMiddleware = require("./middlewares/admin-middleware");
app.use("/", authMiddleware, adminMiddleware, adminRoutes);

app.use('/api/products', productRoutes);
app.use('/admin',adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
