const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool from db.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to get all services
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM Services';
        const [rows] = await pool.query(query); // Use await with promise-based query
        console.log('Fetched services:', rows);
        res.json(rows); // Send JSON response with fetched services
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for creating a new service (POST)
router.post('/create', upload.single('image'), async (req, res) => {
    const { service_name, description, price } = req.body;

    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }

    const image_url = `/uploads/${req.file.filename}`;

    try {
        // Insert service into database
        const insertQuery = 'INSERT INTO Services (service_name, description, price, image_url) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(insertQuery, [service_name, description, price, image_url]);

        // Return the newly created service including the image_url
        const newService = {
            service_id: result.insertId,
            service_name,
            description,
            price,
            image_url
        };

        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get a service by ID
router.get('/:service_id', async (req, res) => {
    const serviceId = req.params.service_id;

    try {
        // Query database for the service with the specified service ID
        const query = 'SELECT * FROM Services WHERE service_id = ?';
        const [rows] = await pool.query(query, [serviceId]);

        // Check if service with the given ID exists
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Return the service data
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching service by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a service by ID (PUT)
router.put('/:service_id', upload.single('image'), async (req, res) => {
    const serviceId = req.params.service_id;
    const { service_name, description, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Check if service exists
        const checkQuery = 'SELECT * FROM Services WHERE service_id = ?';
        const [checkRows] = await pool.query(checkQuery, [serviceId]);
        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Update service in the database
        const updateQuery = 'UPDATE Services SET service_name = ?, description = ?, price = ?' + 
                            (image_url ? ', image_url = ?' : '') + 
                            ' WHERE service_id = ?';
        const queryParams = image_url ? [service_name, description, price, image_url, serviceId] : [service_name, description, price, serviceId];
        await pool.query(updateQuery, queryParams);

        // Return success response with updated service data
        const updatedService = {
            service_id: serviceId,
            service_name,
            description,
            price,
            image_url: image_url || checkRows[0].image_url
        };

        res.json(updatedService);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a service by ID (DELETE)
router.delete('/:service_id', async (req, res) => {
    const serviceId = req.params.service_id;

    try {
        // Check if service exists
        const checkQuery = 'SELECT * FROM Services WHERE service_id = ?';
        const [checkRows] = await pool.query(checkQuery, [serviceId]);
        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Delete appointments associated with the service
        const deleteAppointmentsQuery = 'DELETE FROM appointments WHERE service_id = ?';
        await pool.query(deleteAppointmentsQuery, [serviceId]);

        // Delete service from the database
        const deleteQuery = 'DELETE FROM Services WHERE service_id = ?';
        await pool.query(deleteQuery, [serviceId]);

        // Return success response
        res.json({ message: 'Service and associated appointments deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
