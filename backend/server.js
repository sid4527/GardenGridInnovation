require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const inventoryRoutes = require('./inventory/inventory.routes');

const app = express();
const port = 9000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow only the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Database configuration
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

// Connect to the database
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Garden Grid API');
});

// Use the inventory routes
app.use('/api/inventory', inventoryRoutes);

// Route to get all items from the inventory table
app.get('/api/inventory/items', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT item FROM inventory');
        res.json(result.recordset); // Sends only the item column
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
});

// Route to handle adding a new growth record
app.post('/api/growth-records', async (req, res) => {
    const { RecordDate, PlantName, HeightCM, Notes } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('RecordDate', sql.Date, RecordDate)
            .input('PlantName', sql.NVarChar, PlantName)
            .input('HeightCM', sql.Decimal(5, 2), HeightCM)
            .input('Notes', sql.NVarChar, Notes)
            .query(`
                INSERT INTO GrowthRecords (RecordDate, PlantName, HeightCM, Notes)
                VALUES (@RecordDate, @PlantName, @HeightCM, @Notes)
            `);

        res.status(201).json({ message: 'Growth record added successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error adding growth record' });
    }
});

// Route to handle adding a new care task
app.post('/api/care-tasks', async (req, res) => {
    const { TaskDate, PlantName, CareType, Status, Notes } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('TaskDate', sql.Date, TaskDate)
            .input('PlantName', sql.NVarChar, PlantName)
            .input('CareType', sql.NVarChar, CareType)
            .input('Status', sql.NVarChar, Status || 'Pending') // Default to 'Pending' if Status is not provided
            .input('Notes', sql.NVarChar, Notes)
            .query(`
                INSERT INTO CareTasks (TaskDate, PlantName, CareType, Status, Notes)
                VALUES (@TaskDate, @PlantName, @CareType, @Status, @Notes)
            `);

        res.status(201).json({ message: 'Care task added successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error adding care task' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
