// routes/LoginController.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// MySQL database connection configuration
const dbConfig = require('../dbConfig'); // Import the centralized dbConfig

const getUsersFromDatabase = async (username, password) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute('SELECT User_ID,User_Name,User_Role FROM users WHERE User_Name Like ? AND Password Like ?', [username, password]);
    return rows;
  } finally {
    await connection.end();
  }
};

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database
    const users = await getUsersFromDatabase(username, password);

    // Check if the user exists
    if (users.length > 0) {
      res.json({ success: true, user: users[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error fetching user from the database:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
