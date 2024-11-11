const express = require('express');
const router = express.Router();
const sql = require('mssql'); // Import the mssql package
const InventoryController = require('./inventory.controller');
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Define a POST route for adding inventory data
router.post('/', InventoryController.addInventory);

// Define a GET route for retrieving inventory data (optional, for testing)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Inventory GET endpoint is working' });
});

// Define a GET route for retrieving all items in the 'item' column from the inventory table
router.get('/items', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT item FROM inventory');
        res.json(result.recordset); // Sends only the item column
    } catch (error) {
        console.error('Database error:', error); // Log the exact error
        res.status(500).json({ error: 'Failed to fetch inventory items', details: error.message });
    }
});

module.exports = router;
