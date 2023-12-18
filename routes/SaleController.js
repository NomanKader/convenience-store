// SaleController.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const dbConfig = require("../dbConfig");

// GET route to retrieve all sales
router.get("/", async (req, res) => {
  try {
    const connectionPool = mysql.createPool(dbConfig);
    const connection = await connectionPool.getConnection();

    try {
      // Use JOIN to get the category_id from the product table
      const [sales] = await connection.query(
        "SELECT sale.sale_id, sale.user_id, sale.product_id, sale.quantity, sale.total_price, product.product_name, product.category_id, category.category_name FROM sale JOIN product ON sale.product_id = product.product_id JOIN category ON product.category_id = category.category_id ORDER BY sale.sale_id DESC;"
      );

      res.json({ success: true, sales });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error retrieving sales:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Create route to insert a new sale
router.post("/", async (req, res) => {
  const { user_id, product_id, quantity, create_date } = req.body;

  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Get product details to calculate total_price
      const [productDetails] = await connection.query(
        "SELECT product_price, product_quantity FROM product WHERE product_id = ? FOR UPDATE",
        [product_id]
      );

      if (productDetails.length === 0) {
        // Product with the specified ID does not exist
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }

      const productPrice = productDetails[0].product_price;
      const currentQuantity = productDetails[0].product_quantity;

      if (currentQuantity < quantity) {
        // Insufficient quantity
        res
          .status(400)
          .json({ success: false, message: "Insufficient quantity" });
        return;
      }

      const totalPrice = productPrice * quantity;

      // Insert the new sale into the database
      const [result] = await connection.query(
        "INSERT INTO sale (user_id, product_id, quantity, total_price,create_date) VALUES (?, ?, ?, ?,?)",
        [user_id, product_id, quantity, totalPrice, create_date]
      );

      // Update the product quantity
      await connection.query(
        "UPDATE product SET product_quantity = ? WHERE product_id = ?",
        [currentQuantity - quantity, product_id]
      );

      // Commit the transaction
      await connection.commit();

      // Respond with the ID of the newly inserted sale and calculated total_price
      res.json({
        success: true,
        insertedSaleId: result.insertId,
        calculatedTotalPrice: totalPrice,
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      throw error;
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update route for a sale
router.put("/:saleId", async (req, res) => {
  const saleId = req.params.saleId;
  const { user_id, product_id, quantity, total_price } = req.body;

  try {
    const connectionPool = mysql.createPool(dbConfig);
    const connection = await connectionPool.getConnection();

    try {
      const [existingSales] = await connection.query(
        "SELECT * FROM sale WHERE sale_id = ?",
        [saleId]
      );

      if (existingSales.length === 0) {
        res.status(404).json({ success: false, message: "Sale not found" });
      } else {
        await connection.query(
          "UPDATE sale SET user_id = ?, product_id = ?, quantity = ?, total_price = ? WHERE sale_id = ?",
          [user_id, product_id, quantity, total_price, saleId]
        );

        res.json({ success: true, message: "Sale updated successfully" });
      }
    } finally {
      connection.removeAllListeners();
    }
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE route to delete a sale
router.delete("/:saleId", async (req, res) => {
  const saleId = req.params.saleId;

  try {
    const connectionPool = mysql.createPool(dbConfig);
    const connection = await connectionPool.getConnection();

    try {
      const [existingSales] = await connection.query(
        "SELECT * FROM sale WHERE sale_id = ?",
        [saleId]
      );

      if (existingSales.length === 0) {
        res.status(404).json({ success: false, message: "Sale not found" });
      } else {
        await connection.query("DELETE FROM sale WHERE sale_id = ?", [saleId]);
        res.json({ success: true, message: "Sale deleted successfully" });
      }
    } finally {
      connection.removeAllListeners();
    }
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// GET route to retrieve sales between two dates
router.get('/between-dates', async (req, res) => {
  try {
    const connectionPool = mysql.createPool(dbConfig);
    const connection = await connectionPool.getConnection();

    try {
      const { FromDate, ToDate } = req.query;

      // Use JOIN to get the category_id from the product table
      const [sales] = await connection.query(
        'SELECT sale.sale_id, sale.user_id, sale.product_id, sale.quantity, sale.total_price, sale.create_date, product.product_name, product.category_id, category.category_name FROM sale JOIN product ON sale.product_id = product.product_id JOIN category ON product.category_id = category.category_id WHERE DATE(sale.create_date) BETWEEN ? AND ? ORDER BY sale.sale_id DESC;',
        [FromDate, ToDate]
      );

      res.json({ success: true, sales });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error retrieving sales between dates:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;
