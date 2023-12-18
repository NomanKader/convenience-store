// ProductController.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

// GET route to retrieve all products
router.get('/', async (req, res) => {
  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Retrieve all products from the database
      const [products] = await connection.query('SELECT product.Product_ID, product.Product_Name, product.Product_Price, product.Product_Quantity,category.Category_ID, category.Category_Name FROM product JOIN category ON product.Category_ID = category.Category_ID ORDER BY product.Product_ID DESC');

      // Respond with the list of products
      res.json({ success: true, products });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create route to insert a new product
router.post('/', async (req, res) => {
  const { product_name, product_price, product_quantity, category_id } = req.body;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Insert the new product into the database
      const [result] = await connection.query(
        'INSERT INTO product (product_name, product_price, product_quantity, category_id) VALUES (?, ?, ?, ?)',
        [product_name, product_price, product_quantity, category_id]
      );

      // Respond with the ID of the newly inserted product
      res.json({ success: true, insertedProductId: result.insertId });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update route for a product
router.put('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { product_name, product_price, product_quantity, category_id } = req.body;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Check if the product with the specified ID exists
      const [existingProducts] = await connection.query('SELECT * FROM product WHERE product_id = ?', [productId]);

      if (existingProducts.length === 0) {
        // Product with the specified ID does not exist
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        // Update the product
        await connection.query(
          'UPDATE product SET product_name = ?, product_price = ?, product_quantity = ?, category_id = ? WHERE product_id = ?',
          [product_name, product_price, product_quantity, category_id, productId]
        );

        // Respond with success
        res.json({ success: true, message: 'Product updated successfully' });
      }
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE route to delete a product
router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Check if the product with the specified ID exists
      const [existingProducts] = await connection.query('SELECT * FROM product WHERE product_id = ?', [productId]);

      if (existingProducts.length === 0) {
        // Product with the specified ID does not exist
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        // Delete the product from the database
        await connection.query('DELETE FROM product WHERE product_id = ?', [productId]);

        // Respond with success
        res.json({ success: true, message: 'Product deleted successfully' });
      }
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
//Get route to get the lowest quantity from product table
router.get('/lowest-quantity', async (req, res) => {
  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Retrieve the product with the lowest quantity from the database
      const [lowestQuantityProduct] = await connection.query(
        'SELECT product_id, product_name, product_quantity FROM product ORDER BY product_quantity ASC LIMIT 1'
      );

      // Respond with the product with the lowest quantity
      res.json({ success: true, lowestQuantityProduct: lowestQuantityProduct[0] });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error retrieving lowest quantity product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
// GET route to retrieve available quantity by product name
router.get('/quantity/:productName', async (req, res) => {
  const productName = req.params.productName;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Retrieve the available quantity for the specified product name
      const [product] = await connection.query(
        'SELECT product_quantity FROM product WHERE product_name = ?',
        [productName]
      );

      // Check if the product with the specified name exists
      if (product.length === 0) {
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        // Respond with the available quantity for the product
        res.json({ success: true, availableQuantity: product[0].product_quantity });
      }
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error retrieving available quantity:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
