// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginController = require('./routes/LoginController');
const categoryController=require('./routes/CategoryController');
const productController=require('./routes/ProductController');
const userController=require('./routes/UserController');
const saleController=require('./routes/SaleController');
const dashboardController=require('./routes/DashboardController');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Use the login route
app.use('/api/login', loginController);
app.use('/api/category', categoryController);
app.use('/api/product', productController);
app.use('/api/user', userController);
app.use('/api/sale', saleController);
app.use('/api/dashboard', dashboardController);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
