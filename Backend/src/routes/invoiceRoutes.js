// Backend/src/routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Route to create a new invoice
router.post('/create', async (req, res) => {
    const { appointment_id, invoice_date, total_amount } = req.body;

    try {
        // Insert the new invoice into the database
        const insertQuery = 'INSERT INTO Invoices (appointment_id, invoice_date, total_amount) VALUES (?, ?, ?)';
        const [result] = await pool.query(insertQuery, [appointment_id, invoice_date, total_amount]);

        // Respond with success message
        res.status(201).json({ message: 'Invoice created successfully', invoice_id: result.insertId });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to retrieve an invoice by invoice_id
router.get('/:invoice_id', async (req, res) => {
    const invoiceId = req.params.invoice_id;

    try {
        const query = 'SELECT * FROM Invoices WHERE invoice_id = ?';
        const [rows] = await pool.query(query, [invoiceId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an invoice by invoice_id
router.put('/:invoice_id', async (req, res) => {
    const invoiceId = req.params.invoice_id;
    const { total_amount } = req.body;

    try {
        const updateQuery = 'UPDATE Invoices SET total_amount = ? WHERE invoice_id = ?';
        await pool.query(updateQuery, [total_amount, invoiceId]);

        res.json({ message: 'Invoice updated successfully' });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an invoice by invoice_id
router.delete('/:invoice_id', async (req, res) => {
    const invoiceId = req.params.invoice_id;

    try {
        const deleteQuery = 'DELETE FROM Invoices WHERE invoice_id = ?';
        await pool.query(deleteQuery, [invoiceId]);

        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to list all invoices
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM Invoices';
        const [rows] = await pool.query(query);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to search invoices by appointment_id
router.get('/search', async (req, res) => {
    const appointmentId = req.query.appointment_id;

    try {
        // Query database for invoices with the specified appointment_id
        const query = 'SELECT * FROM Invoices WHERE appointment_id = ?';
        const [rows] = await pool.query(query, [appointmentId]);

        // Check if invoices with the given appointment_id exist
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No invoices found for the appointment_id' });
        }

        // Return the invoices found
        res.json(rows);
    } catch (error) {
        console.error('Error searching invoices by appointment_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
