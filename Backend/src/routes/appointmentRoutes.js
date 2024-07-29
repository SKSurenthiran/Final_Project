// Backend/src/routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js

// Route to get all appointments
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM appointments';
        const [rows] = await pool.query(query); // Use await with promise-based query
        console.log('Fetched appointments:', rows);
        res.json(rows); // Send JSON response with fetched appointments
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get appointments by user ID
router.get('/user/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        const query = 'SELECT * FROM appointments WHERE user_id = ?';
        const [rows] = await pool.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching appointments for user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get total count of appointments
router.get('/count', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS total_appointments FROM Appointments';
        const [rows] = await pool.query(query);
        const totalCount = rows[0].total_appointments;
        res.json({ total_appointments: totalCount });
    } catch (error) {
        console.error('Error fetching total appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a new appointment
router.post('/create', async (req, res) => {
    const { user_id, service_id, appointment_date } = req.body;

    try {
        // Perform validation if necessary (e.g., check if user_id and service_id exist)

        // Insert appointment into database
        const insertQuery = 'INSERT INTO Appointments (user_id, service_id, appointment_date, status) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(insertQuery, [user_id, service_id, appointment_date, 'scheduled']);

        const appointmentId = result.insertId;

        res.status(201).json({
            message: 'Appointment added successfully',
            appointment_id: appointmentId
        });
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an appointment by ID
router.delete('/:appointment_id', async (req, res) => {
    const appointmentId = req.params.appointment_id;

    try {
        // Check if appointment exists
        const checkQuery = 'SELECT * FROM appointments WHERE appointment_id = ?';
        const [checkRows] = await pool.query(checkQuery, [appointmentId]);
        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Delete appointment from the database
        const deleteQuery = 'DELETE FROM appointments WHERE appointment_id = ?';
        await pool.query(deleteQuery, [appointmentId]);

        // Return success response
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
