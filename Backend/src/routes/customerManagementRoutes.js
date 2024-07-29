const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Route to get all customer management records
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM customermanagement';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customer management records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get a customer management record by customer_id
router.get('/:customer_id', async (req, res) => {
    const customerId = req.params.customer_id;
    try {
        const query = 'SELECT * FROM customermanagement WHERE customer_id = ?';
        const [rows] = await pool.query(query, [customerId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Customer record not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching customer record by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a new customer management record
router.post('/create', async (req, res) => {
    const { user_id, service_history } = req.body;
    try {
        const query = 'INSERT INTO customermanagement (user_id, service_history) VALUES (?, ?)';
        await pool.query(query, [user_id, service_history]);
        res.status(201).json({ message: 'Customer management record created successfully' });
    } catch (error) {
        console.error('Error creating customer management record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a customer management record by customer_id
router.put('/:customer_id', async (req, res) => {
    const customerId = req.params.customer_id;
    const { user_id, service_history } = req.body;
    try {
        const query = 'UPDATE customermanagement SET user_id = ?, service_history = ? WHERE customer_id = ?';
        await pool.query(query, [user_id, service_history, customerId]);
        res.json({ message: 'Customer management record updated successfully' });
    } catch (error) {
        console.error('Error updating customer management record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a customer management record by customer_id
router.delete('/:customer_id', async (req, res) => {
    const customerId = req.params.customer_id;
    try {
        const query = 'DELETE FROM customermanagement WHERE customer_id = ?';
        await pool.query(query, [customerId]);
        res.json({ message: 'Customer management record deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer management record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
