const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Get all technicians
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM technicians';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching technicians:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a technician by ID
router.get('/:technician_id', async (req, res) => {
    const technicianId = req.params.technician_id;
    try {
        const query = 'SELECT * FROM technicians WHERE technician_id = ?';
        const [rows] = await pool.query(query, [technicianId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Technician not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching technician:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new technician
router.post('/create', async (req, res) => {
    const { name, specialization, phone } = req.body;
    try {
        const query = 'INSERT INTO technicians (name, specialization, phone) VALUES (?, ?, ?)';
        await pool.query(query, [name, specialization, phone]);
        res.status(201).json({ message: 'Technician created successfully' });
    } catch (error) {
        console.error('Error creating technician:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an existing technician
router.put('/:technician_id', async (req, res) => {
    const technicianId = req.params.technician_id;
    const { name, specialization, phone } = req.body;
    try {
        const query = 'UPDATE technicians SET name = ?, specialization = ?, phone = ? WHERE technician_id = ?';
        const [result] = await pool.query(query, [name, specialization, phone, technicianId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Technician not found' });
        }
        res.json({ message: 'Technician updated successfully' });
    } catch (error) {
        console.error('Error updating technician:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a technician
router.delete('/:technician_id', async (req, res) => {
    const technicianId = req.params.technician_id;
    try {
        console.log(`Attempting to delete technician with ID: ${technicianId}`);

        // Check if technician exists
        const checkQuery = 'SELECT * FROM technicians WHERE technician_id = ?';
        const [checkRows] = await pool.query(checkQuery, [technicianId]);
        if (checkRows.length === 0) {
            console.log('Technician not found');
            return res.status(404).json({ error: 'Technician not found' });
        }

        console.log('Technician found, proceeding to delete related records');

        // Delete related records in the TechnicianSchedules table
        const deleteTechnicianSchedulesQuery = 'DELETE FROM technicianschedules WHERE technician_id = ?';
        await pool.query(deleteTechnicianSchedulesQuery, [technicianId]);

        console.log('Related records deleted, proceeding to delete technician');
        // Proceed with deletion of technician
        const deleteTechnicianQuery = 'DELETE FROM technicians WHERE technician_id = ?';
        await pool.query(deleteTechnicianQuery, [technicianId]);

        res.json({ message: 'Technician and related records deleted successfully' });
    } catch (error) {
        console.error('Error deleting technician:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
