const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Route to get all technician schedules
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM technicianschedules';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching technician schedules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get a technician schedule by schedule_id
router.get('/:schedule_id', async (req, res) => {
    const scheduleId = req.params.schedule_id;
    try {
        const query = 'SELECT * FROM technicianschedules WHERE schedule_id = ?';
        const [rows] = await pool.query(query, [scheduleId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching schedule by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a new technician schedule
router.post('/create', async (req, res) => {
    const { technician_id, appointment_id, date, start_time, end_time } = req.body;
    try {
        const query = 'INSERT INTO technicianschedules (technician_id, appointment_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)';
        await pool.query(query, [technician_id, appointment_id, date, start_time, end_time]);
        res.status(201).json({ message: 'Technician schedule created successfully' });
    } catch (error) {
        console.error('Error creating technician schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a technician schedule by schedule_id
router.put('/:schedule_id', async (req, res) => {
    const scheduleId = req.params.schedule_id;
    const { technician_id, appointment_id, date, start_time, end_time } = req.body;
    try {
        const query = 'UPDATE technicianschedules SET technician_id = ?, appointment_id = ?, date = ?, start_time = ?, end_time = ? WHERE schedule_id = ?';
        await pool.query(query, [technician_id, appointment_id, date, start_time, end_time, scheduleId]);
        res.json({ message: 'Technician schedule updated successfully' });
    } catch (error) {
        console.error('Error updating technician schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a technician schedule by schedule_id
router.delete('/:schedule_id', async (req, res) => {
    const scheduleId = req.params.schedule_id;
    try {
        const query = 'DELETE FROM technicianschedules WHERE schedule_id = ?';
        await pool.query(query, [scheduleId]);
        res.json({ message: 'Technician schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting technician schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
