// UserController.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

// GET route to retrieve all users
router.get('/', async (req, res) => {
    try {
        // Create a new connection pool
        const connectionPool = mysql.createPool(dbConfig);

        // Acquire a connection from the pool
        const connection = await connectionPool.getConnection();

        try {
            // Retrieve all users from the database
            const [users] = await connection.query('SELECT * FROM user Order By user_id DESC');

            // Respond with the list of users
            res.json({ success: true, users });
        } finally {
            // Release the connection back to the pool
            connection.release();
        }
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Create route to insert a new user
router.post('/', async (req, res) => {
    const { user_name, password, user_role, create_date } = req.body;

    try {
        // Create a new connection pool
        const connectionPool = mysql.createPool(dbConfig);

        // Acquire a connection from the pool
        const connection = await connectionPool.getConnection();

        try {
            // Insert the new user into the database
            const [result] = await connection.query('INSERT INTO user (user_name, password, user_role, create_date) VALUES (?, ?, ?, ?)',
                [user_name, password, user_role, create_date]);

            // Respond with the ID of the newly inserted user
            res.json({ success: true, insertedUserId: result.insertId });
        } finally {
            // Release the connection back to the pool
            connection.release();
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Update route for a user
router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { user_name, password, user_role } = req.body;

    try {
        // Create a new connection pool
        const connectionPool = mysql.createPool(dbConfig);

        // Acquire a connection from the pool
        const connection = await connectionPool.getConnection();

        try {
            // Check if the user with the specified ID exists
            const [existingUsers] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);

            if (existingUsers.length === 0) {
                // User with the specified ID does not exist
                res.status(404).json({ success: false, message: 'User not found' });
            } else {
                // Update the user details
                await connection.query('UPDATE user SET user_name = ?, password = ?, user_role = ? WHERE user_id = ?',
                    [user_name, password, user_role, userId]);

                // Respond with success
                res.json({ success: true, message: 'User updated successfully' });
            }
        } finally {
            // Release the connection back to the pool
            connection.release();
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// DELETE route to delete a user
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Create a new connection pool
        const connectionPool = mysql.createPool(dbConfig);

        // Acquire a connection from the pool
        const connection = await connectionPool.getConnection();

        try {
            // Check if the user with the specified ID exists
            const [existingUsers] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);

            if (existingUsers.length === 0) {
                // User with the specified ID does not exist
                res.status(404).json({ success: false, message: 'User not found' });
            } else {
                // Delete the user from the database
                await connection.query('DELETE FROM user WHERE user_id = ?', [userId]);

                // Respond with success
                res.json({ success: true, message: 'User deleted successfully' });
            }
        } finally {
            // Release the connection back to the pool
            connection.release();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
