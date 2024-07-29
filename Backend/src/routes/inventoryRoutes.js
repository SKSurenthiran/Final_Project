// Backend/src/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your database connection pool

// Route to fetch all inventory items
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM inventory';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch a specific inventory item by inventory_id
router.get('/:inventory_id', async (req, res) => {
    const inventoryId = req.params.inventory_id;

    try {
        const query = 'SELECT * FROM inventory WHERE inventory_id = ?';
        const [rows] = await pool.query(query, [inventoryId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching inventory item by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a new inventory item
router.post('/create', async (req, res) => {
    const { item_name, quantity, price_per_unit } = req.body;

    try {
        const insertQuery = 'INSERT INTO inventory (item_name, quantity, price_per_unit) VALUES (?, ?, ?)';
        const [result] = await pool.query(insertQuery, [item_name, quantity, price_per_unit]);

        res.status(201).json({ message: 'Inventory item created successfully', inventory_id: result.insertId });
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an existing inventory item by inventory_id
router.put('/:inventory_id', async (req, res) => {
    const inventoryId = req.params.inventory_id;
    const { item_name, quantity, price_per_unit } = req.body;

    try {
        const updateQuery = 'UPDATE inventory SET item_name = ?, quantity = ?, price_per_unit = ? WHERE inventory_id = ?';
        await pool.query(updateQuery, [item_name, quantity, price_per_unit, inventoryId]);

        res.json({ message: 'Inventory item updated successfully' });
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an inventory item by inventory_id
router.delete('/:inventory_id', async (req, res) => {
    const inventoryId = req.params.inventory_id;

    try {
        const deleteQuery = 'DELETE FROM inventory WHERE inventory_id = ?';
        await pool.query(deleteQuery, [inventoryId]);

        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
