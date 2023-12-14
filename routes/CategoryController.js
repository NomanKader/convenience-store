// CategoryController.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig'); 
// GET route to retrieve all categories
router.get('/', async (req, res) => {
    try {
      // Create a new connection pool
      const connectionPool = mysql.createPool(dbConfig);
  
      // Acquire a connection from the pool
      const connection = await connectionPool.getConnection();
  
      try {
        // Retrieve all categories from the database
        const [categories] = await connection.query('SELECT * FROM category Order By Category_ID DESC');
  
        // Respond with the list of categories
        res.json({ success: true, categories });
      } finally {
        // Release the connection back to the pool
        connection.release();
      }
    } catch (error) {
      console.error('Error retrieving categories:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
// Create route to insert a new category
router.post('/', async (req, res) => {
  const { category_name } = req.body;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Check if the category name already exists
      const [existingCategories] = await connection.query('SELECT * FROM category WHERE category_name = ?', [category_name]);

      if (existingCategories.length > 0) {
        // Category name already exists, return an error
        res.status(409).json({ success: false, message: 'Category name already exists' });
      } else {
        // Insert the new category into the database
        const [result] = await connection.query('INSERT INTO category (category_name) VALUES (?)', [category_name]);

        // Respond with the ID of the newly inserted category
        res.json({ success: true, insertedCategoryId: result.insertId });
      }
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
// Update route for a category
router.put('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const { category_name } = req.body;
  
    try {
      // Create a new connection pool
      const connectionPool = mysql.createPool(dbConfig);
  
      // Acquire a connection from the pool
      const connection = await connectionPool.getConnection();
  
      try {
        // Check if the category with the specified ID exists
        const [existingCategories] = await connection.query('SELECT * FROM category WHERE category_id = ?', [categoryId]);
  
        if (existingCategories.length === 0) {
          // Category with the specified ID does not exist
          res.status(404).json({ success: false, message: 'Category not found' });
        } else {
          // Check if the updated category name already exists
          const [categoriesWithSameName] = await connection.query('SELECT * FROM category WHERE category_name = ? AND category_id != ?', [category_name, categoryId]);
  
          if (categoriesWithSameName.length > 0) {
            // Category name already exists for another category
            res.status(409).json({ success: false, message: 'Category name already exists for another category' });
          } else {
            // Update the category name
            await connection.query('UPDATE category SET category_name = ? WHERE category_id = ?', [category_name, categoryId]);
  
            // Respond with success
            res.json({ success: true, message: 'Category updated successfully' });
          }
        }
      } finally {
        // Release the connection back to the pool
        connection.release();
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
// DELETE route to delete a category
router.delete('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      // Create a new connection pool
      const connectionPool = mysql.createPool(dbConfig);
  
      // Acquire a connection from the pool
      const connection = await connectionPool.getConnection();
  
      try {
        // Check if the category with the specified ID exists
        const [existingCategories] = await connection.query('SELECT * FROM category WHERE category_id = ?', [categoryId]);
  
        if (existingCategories.length === 0) {
          // Category with the specified ID does not exist
          res.status(404).json({ success: false, message: 'Category not found' });
        } else {
          // Delete the category from the database
          await connection.query('DELETE FROM category WHERE category_id = ?', [categoryId]);
  
          // Respond with success
          res.json({ success: true, message: 'Category deleted successfully' });
        }
      } finally {
        // Release the connection back to the pool
        connection.release();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  
  module.exports = router;