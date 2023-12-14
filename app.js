// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginController = require('./routes/LoginController');
const categoryController=require('./routes/CategoryController');
const productController=require('./routes/ProductController');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Use the login route
app.use('/api/login', loginController);
app.use('/api/category', categoryController);
app.use('/api/product', productController);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
