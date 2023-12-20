const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

// GET route for dashboard data
router.get('/', async (req, res) => {
  try {
    // Create a new connection pool
    const connectionPool = mysql.createPool(dbConfig);

    // Acquire a connection from the pool
    const connection = await connectionPool.getConnection();

    try {
      // Get total sale amount by today
      const [totalSaleAmountResult] = await connection.query(
        'SELECT SUM(total_price) AS totalSaleAmount FROM sale WHERE DATE(create_date) = CURDATE()'
      );
      const totalSaleAmount = totalSaleAmountResult[0].totalSaleAmount || 0;

      // Get total number of users
      const [totalUsersResult] = await connection.query(
        'SELECT COUNT(*) AS totalUsers FROM user'
      );
      const totalUsers = totalUsersResult[0].totalUsers || 0;

      // Get total number of products
      const [totalProductsResult] = await connection.query(
        'SELECT COUNT(*) AS totalProducts FROM product'
      );
      const totalProducts = totalProductsResult[0].totalProducts || 0;

      // Get low stock product names by today
      const [lowStockProductsResult] = await connection.query(
        'SELECT product.product_name FROM product WHERE product.product_quantity < ?',
        [11] // Set your threshold value for low stock
      );
      const lowStockProducts = lowStockProductsResult.map(row => row.product_name);

      const [bestSellerProductResult] = await connection.query(`
        SELECT product.product_name
        FROM product
        INNER JOIN (
          SELECT product_id
          FROM sale
          WHERE DATE(create_date) = CURDATE()
          GROUP BY product_id
          ORDER BY COUNT(*) DESC
          LIMIT 1
        ) AS bestSeller ON product.product_id = bestSeller.product_id
      `);
      const bestSellerProduct = bestSellerProductResult.length > 0 ? bestSellerProductResult[0].product_name : null;

      // Respond with the dashboard data
      res.json({
        success: true,
        totalSaleAmount,
        totalUsers,
        totalProducts,
        lowStockProducts,
        bestSellerProduct,
      });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error retrieving dashboard data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;
