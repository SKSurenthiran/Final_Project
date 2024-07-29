// Backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM Users';
        const [rows] = await pool.query(query); // Use await with promise-based query
        console.log('Fetched users:', rows);
        res.json(rows); // Send JSON response with fetched users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get total count of customers
router.get('/customers/count', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS total_customers FROM Users WHERE role = ?';
        const [rows] = await pool.query(query, ['customer']);
        const totalCount = rows[0].total_customers;
        res.json({ total_customers: totalCount });
    } catch (error) {
        console.error('Error fetching total customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get a user by ID
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        // Query database for the user with the specified user ID
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        const [rows] = await pool.query(query, [userId]);

        // Check if user with the given ID exists
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user registration (POST)
router.post('/register', async (req, res) => {
    const { username, password, email, phone } = req.body;

    // Ensure role is set to 'customer'
    const finalRole = 'customer';

    try {
        // Check if username or email already exists
        const checkQuery = 'SELECT COUNT(*) as count FROM Users WHERE username = ? OR email = ?';
        const [checkRows] = await pool.query(checkQuery, [username, email]);
        if (checkRows[0].count > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Insert user into database
        const insertQuery = 'INSERT INTO Users (username, password, email, phone, role) VALUES (?, ?, ?, ?, ?)';
        await pool.query(insertQuery, [username, password, email, phone, finalRole]);

        // Return success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a user by ID (PUT)
router.put('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const { username, email, phone, password } = req.body;

    try {
        // Update only the fields that are provided
        const updateQuery = 'UPDATE Users SET username = ?, email = ?, phone = ? WHERE user_id = ?';
        await pool.query(updateQuery, [username, email, phone, userId]);

        if (password) {
            const updatePasswordQuery = 'UPDATE Users SET password = ? WHERE user_id = ?';
            await pool.query(updatePasswordQuery, [password, userId]);
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user login (POST)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find user by username and password
        const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
        const [rows] = await pool.query(query, [username, password]);

        if (rows.length > 0) {
            const user = rows[0];
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get user ID by username, password, and role
router.get('/id', async (req, res) => {
    const { username, password, role } = req.query;

    try {
        // Query database for the user with the specified username, password, and role
        const query = 'SELECT user_id FROM Users WHERE username = ? AND password = ? AND role = ?';
        const [rows] = await pool.query(query, [username, password, role]);

        // Check if user with the given credentials and role exists
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user ID
        res.json({ user_id: rows[0].user_id });
    } catch (error) {
        console.error('Error fetching user ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to delete a user by user_id (DELETE)
router.delete('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        console.log(`Attempting to delete user with ID: ${userId}`);
        // Check if user exists
        const checkQuery = 'SELECT * FROM Users WHERE user_id = ?';
        const [checkRows] = await pool.query(checkQuery, [userId]);
        
        if (checkRows.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found, proceeding to delete related records');

        // Delete related records in the TechnicianSchedules table
        const deleteTechnicianSchedulesQuery = 'DELETE FROM TechnicianSchedules WHERE appointment_id IN (SELECT appointment_id FROM Appointments WHERE user_id = ?)';
        await pool.query(deleteTechnicianSchedulesQuery, [userId]);

        // Delete related records in the Invoices table
        const deleteInvoicesQuery = 'DELETE FROM Invoices WHERE appointment_id IN (SELECT appointment_id FROM Appointments WHERE user_id = ?)';
        await pool.query(deleteInvoicesQuery, [userId]);

        // Delete related records in the Appointments table
        const deleteAppointmentsQuery = 'DELETE FROM Appointments WHERE user_id = ?';
        await pool.query(deleteAppointmentsQuery, [userId]);

        // Delete related records in the CustomerManagement table
        const deleteCustomerManagementQuery = 'DELETE FROM CustomerManagement WHERE user_id = ?';
        await pool.query(deleteCustomerManagementQuery, [userId]);

        console.log('Related records deleted, proceeding to delete user');
        // Proceed with deletion of user
        const deleteUserQuery = 'DELETE FROM Users WHERE user_id = ?';
        await pool.query(deleteUserQuery, [userId]);

        res.json({ message: 'User and related records deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
